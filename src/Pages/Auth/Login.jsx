import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const states = location.state;
  const navigate = useNavigate();
  const { signInUser, signGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        console.log(result);
        navigate(states || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSignInWIthGoogle = () => {
    signGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(states || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset ">
          <h1 className="text-5xl font-extrabold">Welcome Back</h1>
          <p className="text-lg mb-3">Login with Profast</p>
          <label className="label font-bold text-black">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-sm"
            placeholder="Email"
          />
          <label className="label font-bold text-black">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input w-sm"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-400"> required password</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-400">Password should be min 6 character</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-primary w-sm mt-4 text-black">
            Login
          </button>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/register"}>
              Register
            </Link>
          </p>
        </fieldset>
      </form>
      <div>
        <div className="divider w-sm">OR</div>
        <div
          onClick={handleSignInWIthGoogle}
          className="flex justify-center gap-5 btn items-center w-sm"
        >
          <FcGoogle size={20} />
          <button>Register with google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
