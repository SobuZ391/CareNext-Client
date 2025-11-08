import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("fullName", user.displayName);
      setValue("email", user.email);
      setValue("image", user.photoURL);
    }
  }, [user, setValue]);

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

  const onSubmit = async (data) => {
    const { fullName, image, password } = data;

    try {
      await updateUserProfile({ displayName: fullName, photoURL: image });

      if (password && verifyPassword(password)) {
        await updateUserPassword(password);
      }

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>CareNext Pharamacy | Profile Update</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-b from-[#cfd9e2] via-[#c6d2dd] to-[#D7EAFF]p-6">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 text-center border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Update Profile</h1>
            <p className="text-gray-600 mt-2">
              Keep your information up-to-date
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-indigo-500"
                  {...register("fullName", { required: true })}
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 bg-gray-100 cursor-not-allowed"
                  {...register("email")}
                  readOnly
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <div className="relative">
                <FaImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered w-full pl-10 focus:ring-2 focus:ring-indigo-500"
                  {...register("image")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="New Password"
                  className="input input-bordered w-full pr-12 focus:ring-2 focus:ring-indigo-500"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
