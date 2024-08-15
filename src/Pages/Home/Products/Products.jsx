import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const ratingStyle = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#60a5fa",
    inactiveFillColor: "#eff6ff",
  };

  const axiosPublic = useAxiosPublic();
  const { data: gadget = [] } = useQuery({
    queryKey: ["gadget"],
    queryFn: async () => {
      const res = await axiosPublic.get("/gadget");
      return res.data;
    },
  });

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {gadget.map((gadget) => (
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
      <div className="join my-10 gap-2">
        <button className="join-item btn bg-blue-100">1</button>
        <button className="join-item btn btn-active bg-blue-100">2</button>
        <button className="join-item btn bg-blue-100">3</button>
        <button className="join-item btn bg-blue-100">4</button>
      </div>
    </>
  );
};

export default Products;
