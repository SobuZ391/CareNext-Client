import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UserHome from "../../Layout/Dashboard/UserHome";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // prevents query before user loads
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching payment data");
      console.error(error);
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Helmet>
        <title>CareNest Pharmacy | Dashboard | Profile</title>
      </Helmet>

      {/* Medical-themed background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        
        {/* Medical icons scattered in background */}
        <div className="absolute top-20 right-20 text-blue-100 opacity-30">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-1/4 text-cyan-100 opacity-30">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3V8zM4 8h2V6H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-2h-2v2H4V8z"/>
          </svg>
        </div>
      </div>

      <div className="relative container mx-auto py-8 px-4">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent mb-4">
            User Dashboard
          </h1>
          <p className="text-gray-600 text-lg flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Manage your medical profile and track your activities
          </p>
        </div>

        {/* Welcome Card */}
        <div className="max-w-md mx-auto md:mx-0 mb-6">
          <div className="bg-white/90 backdrop-blur-lg border border-blue-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white text-center">
              <UserHome />
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white/90 backdrop-blur-lg border border-blue-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-6">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 group-hover:shadow-sm transition-all duration-300">
                  <span className="text-xl lg:text-2xl font-medium text-gray-800">
                    {user.displayName}
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 group-hover:shadow-sm transition-all duration-300">
                  <span className="text-lg text-gray-800">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="text-center md:text-right">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto md:mx-0 shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto md:mx-0 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white/90 backdrop-blur-lg border border-blue-200/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h10z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
          </div>

          {/* Loading */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-blue-200"></div>
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute top-0 left-0"></div>
              </div>
              <span className="ml-4 text-lg text-gray-600">
                Loading payment history...
              </span>
            </div>
          ) : isError ? (
            // Error
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg text-red-600 font-medium">
                Error loading payment history
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please try refreshing the page or contact support
              </p>
            </div>
          ) : payments.length === 0 ? (
            // Empty State
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-600 font-medium">No payment history found</p>
              <p className="text-sm text-gray-500 mt-2">
                Your payment transactions will appear here once you make purchases
              </p>
            </div>
          ) : (
            // Payment Table
            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                    <tr>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">
                        Transaction ID
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="py-4 px-6 text-left font-semibold text-sm uppercase tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {payments.map((payment, index) => (
                      <tr
                        key={payment.paymentIntentId}
                        className={`hover:bg-blue-50 transition-all duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-6 font-mono text-sm text-gray-600 max-w-xs truncate">
                          {payment.paymentIntentId}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-green-600 text-lg">
                            ${payment.amount}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide ${
                              payment.status === "completed" || payment.status === "paid"
                                ? "bg-green-100 text-green-800"
                                : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {payment.status === "completed" ? "Paid" : 
                             payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;