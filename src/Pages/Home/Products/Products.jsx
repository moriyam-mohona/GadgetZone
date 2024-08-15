import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

const Products = () => {
  // const [rating, setRating] = useState(0);
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#60a5fa",
    inactiveFillColor: "#bfdbfe",
  };

  const axiosPublic = useAxiosPublic();
  const { data: gadget = [] } = useQuery({
    queryKey: ["gadget"],
    queryFn: async () => {
      const res = await axiosPublic.get("/gadget");
      return res.data;
    },
  });

  //  const { data: users = [], refetch } = useQuery({
  //    queryKey: ["users"],
  //    queryFn: async () => {
  //      const res = await axiosSecure.get("/users");
  //      return res.data;
  //    },
  //  });

  return (
    <div className="grid grid-cols-3 gap-10">
      {gadget.map((gadget) => (
        <div
          key={gadget._id}
          className="card image-full w-96 shadow-xl text-white"
        >
          <figure>
            <img src={gadget.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">{gadget.productName}</h2>
              <h2 className="card-title text-blue-400">$ {gadget.price}</h2>
            </div>
            <p>{gadget.description}</p>
            <Rating
              style={{ minWidth: 15, maxWidth: 100 }}
              value={gadget.rating}
              itemStyles={ratingStyle}
            />
            <p>{gadget.ratings}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary bg-blue-blue-400 ">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
