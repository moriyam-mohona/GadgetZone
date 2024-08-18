import { useContext } from "react";
import { AuthContext } from "../../Pages/Authentication/Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSignUp()
      .then((result) => {
        toast.success("Successfully Signed Up");
        const googleLoggedUser = result.user;
        console.log(googleLoggedUser);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };
  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline btn-info px-10 mx-auto"
      >
        <FcGoogle />
        Sign in with Google
      </button>
    </>
  );
};

export default SocialLogin;
