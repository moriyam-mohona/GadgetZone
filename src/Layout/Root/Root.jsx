import { Outlet } from "react-router-dom";
import Navbar from "../../Pages/SharedPages/Navbar/Navbar";
import Footer from "../../Pages/SharedPages/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
