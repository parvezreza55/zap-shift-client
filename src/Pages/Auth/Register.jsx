import React from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const states = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, signGoogle } = useAuth();

  const onSubmit = (data) => {
    const { email, password } = data;
    createUser(email, password)
      .then((result) => {
        console.log(result);
        navigate(states || "/");
      })
      .catch((error) => {
        console.log(error);
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
          <h1 className="text-5xl font-extrabold">Create an Account</h1>
          <p className="text-lg mb-3">Register with Profast</p>
          <label className="label font-bold text-black">Name</label>
          <input
            type="text"
            {...register("name")}
            className="input w-sm"
            placeholder="Name"
          />
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
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-500" to={"/login"}>
              Login
            </Link>
          </p>
        </fieldset>
      </form>
      <div className="divider w-sm">OR</div>
      <div
        onClick={handleSignInWIthGoogle}
        className="flex justify-center gap-5 btn items-center w-sm"
      >
        <FcGoogle size={20} />
        <button>Register with google</button>
      </div>
    </div>
  );
};

export default Register;
