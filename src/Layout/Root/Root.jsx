import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/SharedPages/Navbar/Navbar";
import Footer from "../../Pages/SharedPages/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
