import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Pages/Authentication/Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosPublic();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user.email}`);
      return res.data;
    },
    onSuccess: () => {
      console.log("Cart data updated!");
    },
  });

  return [cart, refetch];
};

export default useCart;
