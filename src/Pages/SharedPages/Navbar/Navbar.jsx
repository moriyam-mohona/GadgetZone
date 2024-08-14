import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/Provider/AuthProvider";
// import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const navItems = (
    <>
      <NavLink to="/">
        <a>Home</a>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <img src={logo} alt="" className="w-44" />
        </Link>
      </div>

      <div className="navbar-end gap-5">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="btn glass bg-blue-400 text-white"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn glass bg-blue-400 text-white">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
