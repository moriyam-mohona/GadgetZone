import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Filter from "../../../Components/Filter/Filter";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

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
  return (
    <>
      <div className="flex flex-col lg:flex-row mb-10 w-full justify-center gap-5 mx-auto">
        <form className="join w-full mx-auto" onSubmit={handleSearch}>
          <div className="input input-info flex items-center gap-2 join-item max-w-sm  w-full">
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
              // value={searchItem}
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
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {gadget.map((gadget) => (
          <div
            key={gadget._id}
            className="card image-full h-60 shadow-xl text-white"
          >
            <figure className="bg-blue-300">
              <img src={gadget.image} alt="gadgetZone" className="w-full" />
            </figure>
            <div className="card-body sm:p-2 md:p-4 lg:p-5">
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
              <Rating
                style={{ minWidth: 15, maxWidth: 120 }}
                value={gadget.rating}
                itemStyles={ratingStyle}
              />
              <p>{gadget.ratings}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
      {!searchItem && (
        <div className="join my-10 gap-2">
          <button
            onClick={handlePrevPage}
            className="join-item btn btn-outline text-xl bg-blue-100 text-blue-500"
          >
            <MdKeyboardDoubleArrowLeft />
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              key={page}
              className={`join-item btn ${
                currentPage === page ? "btn-active" : "bg-blue-100"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className="join-item btn btn-outline text-xl bg-blue-100 text-blue-500"
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      )}
    </>
  );
};

export default Products;
