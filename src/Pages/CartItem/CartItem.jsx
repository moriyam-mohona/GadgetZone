import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useCart from "../../Hooks/useCart";

const CartItem = () => {
  const [cart, refetchCart] = useCart();
  const axiosPublic = useAxiosPublic();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            console.log("Item deleted, refetching cart data...");
            refetchCart();
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4 text-gray-800">
        <h2 className="mb-4 text-2xl text-center">Wishlist</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead className="bg-blue-100 text-gray-500">
              <tr className="text-left">
                <th className="p-3">Id #</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Due</th>
                <th className="p-3">Price</th>
                <th className="p-3">Action</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-opacity-20 border-gray-300 bg-gray-50"
                >
                  <td className="p-3">
                    <p>{index + 1}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.productName}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.brand}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.productName}</p>
                  </td>
                  <td className="p-3">
                    <p>${item.price}</p>
                  </td>
                  <td className="p-3">
                    <button className="px-3 py-1 font-semibold rounded-md bg-blue-400 text-gray-50">
                      <span>Pay</span>
                    </button>
                  </td>
                  <td className="p-5">
                    <button onClick={() => handleDelete(item._id)}>
                      <RiDeleteBin6Line className="text-xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
