import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const Products = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="card image-full w-96 shadow-xl text-white">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title">Shoes!</h2>
            <h2 className="card-title text-blue-400">Price</h2>
          </div>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <Rating
            style={{ minWidth: 20, maxWidth: 150 }}
            value={rating}
            onChange={setRating}
          />
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-blue-blue-400 ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
