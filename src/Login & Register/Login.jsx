// src/pages/Login.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signInUser, googleSignIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // ---------------- Email/Password Login ----------------
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    try {
      await signInUser(email, password);
      toast.success("Login successful! Welcome!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Login failed: Check your email or password");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Google Login ----------------
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      toast.success(`Welcome ${user.displayName || "User"}!`);
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>CareNext Pharmacy | Login</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 p-4">
        {/* Card */}
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Welcome
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Please enter your credentials to Sign In!
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("email", { required: "Email is required" })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none pr-10"
                {...register("password", { required: "Password is required" })}
                aria-invalid={errors.password ? "true" : "false"}
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
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full transition text-white py-3 rounded-lg font-medium shadow ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Switch to Signup */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Please Sign Up
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium"
          >
            <FaGoogle className="text-red-500 text-lg" />
            Continue with Google
          </button>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default Login;
