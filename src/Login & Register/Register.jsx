import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  // Password Validation
  const verifyPassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasValidLength = password.length >= 6;

    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!hasNumeric) {
      toast.error("Password must contain at least one number.");
      return false;
    }
    if (!hasValidLength) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const onSubmit = (data) => {
    const { email, password, image, fullName, role } = data;

    if (!verifyPassword(password)) return;

    createUser(email, password)
      .then(() => {
        updateUserProfile(fullName, image)
          .then(() => {
            const userInfo = { name: fullName, email, role, image };

            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                toast.success("Registration successful! Welcome!");
                setTimeout(() => {
                  navigate(from);
                }, 1000);
              }
            });
          })
          .catch((error) => {
            toast.error("Failed to update profile: " + error.message);
          });
      })
      .catch((error) => {
        toast.error("Registration failed: " + error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>CareNext Pharamacy | Register</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 p-4">
        {/* Card */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Please enter your credentials to Sign Up!
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full name"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                Full name is required
              </span>
            )}

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}

            {/* Image URL */}
            <input
              type="text"
              placeholder="Image URL"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("image")}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}

            {/* Role */}
            <select
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("role", { required: true })}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
            {errors.role && (
              <span className="text-red-500 text-sm">Role is required</span>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-medium shadow"
            >
              Register
            </button>
          </form>

          {/* Switch to Login */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Please Login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <SocialLogin />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
