import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://gadget-zone-server-nine.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
