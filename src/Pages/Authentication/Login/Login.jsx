import { useContext } from "react";
import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        Swal.fire("Login Successful");
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");

        // ...
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
    reset();
  };

  return (
    <div className="my-10 mb-20">
      <div className="py-10 px-20 border border-blue-200 rounded-xl max-w-xl mx-auto">
        <h2 className="text-center text-xl ">Login</h2>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Email<span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input  input-bordered input-info w-full  max-w-lg"
            />
            {errors.email && (
              <span className="text-red-500 text-sm my-1">
                This field is required
              </span>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Password<span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
              })}
              className="input  input-bordered input-info w-full min-w-sm max-w-lg"
            />
            {errors.password && (
              <span className="text-red-500 text-sm my-1">
                This field is required
              </span>
            )}
          </label>
          <button
            type="submit"
            className="btn btn-outline btn-info my-5 bg-blue-200 px-10 mx-auto"
          >
            Submit
          </button>
          <p className="text-sm">
            Not have an account?{" "}
            <Link to="/signup" className="text-blue-400 link">
              Sign up
            </Link>
          </p>
          <div className="divider">or</div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Login;
