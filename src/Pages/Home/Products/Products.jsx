import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const itemsPerPage = 12;

  // Load Data From database....
  const axiosPublic = useAxiosPublic();
  const { data = { result: [], totalItems: 0 }, refetch } = useQuery({
    queryKey: ["gadget", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(
        // `/gadget?page=${currentPage}&size=${itemsPerPage}`
        `/gadget?page=${searchItem ? 0 : currentPage}&size=${
          searchItem ? 0 : itemsPerPage
        }&search=${searchItem}`
      );
      return res.data;
    },
  });

  const gadget = data.result;
  const totalItems = data.totalItems;

  // Search functionality....
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.searchItem.value;
    setSearchItem(searchText);
    refetch();
  };

  const filteredGadgets = gadget.filter((g) =>
    g.productName.toLowerCase().includes(searchItem.toLowerCase())
  );

  // Pagination
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

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

  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#60a5fa",
    inactiveFillColor: "#eff6ff",
  };

  return (
    <>
      <div>
        <form className="join" onSubmit={handleSearch}>
          <div className="input input-bordered flex items-center gap-2 join-item">
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
              className="input"
              placeholder="Search"
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
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredGadgets.map((gadget) => (
          <div
            key={gadget._id}
            className="card image-full h-60 shadow-xl text-white"
          >
            <figure className="bg-blue-300">
              <img src={gadget.image} alt="gadgetZone" />
            </figure>
            <div className="card-body sm:p-2 md:p-4 lg:p-5">
              <div className="flex justify-between">
                <h2 className="card-title">{gadget.productName}</h2>
                <h2 className="card-title text-blue-400">$ {gadget.price}</h2>
              </div>
              <p className="font-bold">{gadget.category}</p>
              <p>{gadget.description}</p>
              <Rating
                style={{ minWidth: 15, maxWidth: 100 }}
                value={gadget.rating}
                itemStyles={ratingStyle}
              />
              <p>{gadget.ratings}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="join my-10 gap-2">
        <button onClick={handlePrevPage} className="join-item btn btn-outline">
          Previous page
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
        <button onClick={handleNextPage} className="join-item btn btn-outline">
          Next
        </button>
      </div> */}
      {!searchItem && (
        <div className="join my-10 gap-2">
          <button
            onClick={handlePrevPage}
            className="join-item btn btn-outline"
          >
            Previous page
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
            className="join-item btn btn-outline"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Products;
