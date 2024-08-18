import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Filter from "../../../Components/Filter/Filter";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { LiaCartPlusSolid } from "react-icons/lia";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../../../Hooks/useCart";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const itemsPerPage = 9;

  // Load Data From database....
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [, refetchCart] = useCart();
  const { data = { result: [], totalItems: 0 }, refetch } = useQuery({
    queryKey: [
      "gadget",
      currentPage,
      itemsPerPage,
      searchItem,
      brand,
      category,
      priceRange,
      sortOrder,
    ],
    queryFn: async () => {
      let priceQuery = "";
      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        priceQuery = `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
      }
      const res = await axiosPublic.get(
        `/gadget?page=${currentPage}&size=${itemsPerPage}&search=${searchItem}&brand=${brand}&category=${category}${priceQuery}&sortOrder=${sortOrder}`
      );
      return res.data;
    },
  });

  const gadget = data.result;
  const totalItems = data.totalItems;
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Search functionality....
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.searchItem.value;
    setSearchItem(searchText);
    refetch();
  };
  // Pagination....
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  //Rating....
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#60a5fa",
    inactiveFillColor: "#eff6ff",
  };
  // Sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    refetch(); // Refetch data to apply the new sorting order
  };

  const handleAddToCart = (gadget) => {
    if (user && user.email) {
      const cartItem = {
        email: user.email,
        gadgetId: gadget._id,
        productName: gadget.productName,
        image: gadget.image,
        description: gadget.description,
        price: gadget.price,
        category: gadget.category,
        brand: gadget.brand,
        rating: gadget.rating,
        createdAt: gadget.createdAt,
      };
      axiosPublic.post("/cart", cartItem).then((res) => {
        if (res.data.insertedId) {
          toast.success(`${gadget.productName} added to the cart`);
          refetchCart();
        }
      });
    } else {
      toast.error("Please Login First");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 mb-10 w-full justify-center items-center gap-6 md:gap-5 mx-auto">
        <form className="join w-full mx-auto" onSubmit={handleSearch}>
          <div className="input input-info flex items-center gap-2 join-item w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
              fill="currentColor"
              className="h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              name="searchItem"
              type="text"
              className="input-info"
              placeholder="Search product"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn join-item bg-blue-300 text-white"
          >
            Search
          </button>
        </form>

        <Filter
          setBrand={setBrand}
          refetch={refetch}
          setCategory={setCategory}
          setPriceRange={setPriceRange}
        />

        <select className="select select-info" onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="date_desc">Date Added: Newest first</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {gadget.map((gadget) => (
          <div
            key={gadget._id}
            className="card image-full h-72 shadow-xl text-white"
          >
            <figure className="bg-blue-300">
              <img src={gadget.image} alt="gadgetZone" className="w-full" />
            </figure>
            <div className="card-body md:p-4 lg:p-5">
              <div className="flex justify-between items-start">
                <h2 className="card-title">
                  {gadget.productName} ({gadget.brand})
                </h2>
                <h2 className=" text-blue-400 bg-white px-2 py-1 rounded text-lg font-bold">
                  ${gadget.price}
                </h2>
              </div>
              <p className="font-bold">{gadget.category}</p>
              <p>{gadget.description}</p>
              <div className="flex justify-between">
                <Rating
                  style={{ minWidth: 15, maxWidth: 120 }}
                  value={gadget.rating}
                  itemStyles={ratingStyle}
                />
                <button
                  // onClick={handleAddToCart}
                  onClick={() => handleAddToCart(gadget)}
                  className="btn bg-blue-50 py-0 px-2"
                >
                  <LiaCartPlusSolid className="text-2xl" />
                </button>
              </div>

              <p>{gadget.ratings}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
      {!searchItem && (
        <div className="join my-10 gap-2 flex flex-wrap justify-center">
          <button
            onClick={handlePrevPage}
            className="join-item btn btn-outline text-xs sm:text-sm md:text-base  bg-blue-100 text-blue-500 px-2 py-1"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`join-item btn text-xs sm:text-sm md:text-base px-2 py-1 ${
                currentPage === page ? "btn-active" : "bg-blue-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className="join-item btn btn-outline text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl bg-blue-100 text-blue-500 px-2 py-1"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      )}
      {/* <ToastContainer /> */}
      <Toaster />
    </>
  );
};

export default Products;
