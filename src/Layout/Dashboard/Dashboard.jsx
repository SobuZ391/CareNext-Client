import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useSeller from "../../Hooks/useSeller";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUser, 
  FaMoneyCheckAlt, 
  FaTags,
  FaHeartbeat,
  FaPills,
  FaUserMd,
  FaUsers,
  FaChartLine,
  FaBullhorn,
  FaFileInvoiceDollar,
  FaCalendarCheck,
  FaFileMedical,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Helmet>
        <title>
          {isAdmin ? "Admin Dashboard" : isSeller ? "Seller Dashboard" : "Dashboard"}CareNest Pharmacy
        </title>
      </Helmet>

      {/* Enhanced Sidebar */}
      <div className="w-full md:w-72 bg-gradient-to-b from-blue-900 to-blue-800 shadow-xl">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-blue-700 bg-gradient-to-r from-blue-800 to-blue-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-white font-semibold text-xl">CareNest Pharmacy</h2>
                <p className="text-blue-200 text-sm">Medical Dashboard</p>
              </div>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden bg-blue-700 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`px-4 py-6 space-y-2 md:block transition-all duration-300 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          {isAdmin && (
            <>
              {/* Main Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Main
                </h3>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHome className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Dashboard</span>
                </NavLink>

                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUserMd className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Admin Home</span>
                </NavLink>

                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUsers className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Manage Users</span>
                </NavLink>
              </div>

              {/* Medical Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Medical
                </h3>
                <NavLink
                  to="/dashboard/manage-categories"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPills className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Manage Medicines</span>
                </NavLink>
              </div>

              {/* Business Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Business
                </h3>
                <NavLink
                  to="/dashboard/payment-management"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaMoneyCheckAlt className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Payment Management</span>
                </NavLink>

                <NavLink
                  to="/dashboard/sales-report"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaChartLine className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Sales Report</span>
                </NavLink>

                <NavLink
                  to="/dashboard/banner-management"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaBullhorn className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Promotions</span>
                </NavLink>
              </div>
            </>
          )}

          {isSeller && (
            <>
              {/* Seller Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-4 mb-6">
                <h2 className="text-white font-bold text-lg flex items-center">
                  <FaUserMd className="mr-2" />
                  Seller Portal
                </h2>
                <p className="text-green-100 text-sm">Manage your medicine store</p>
              </div>

              {/* Main Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Main
                </h3>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHome className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Home</span>
                </NavLink>

                <NavLink
                  to="/dashboard/user-dashboard"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Profile</span>
                </NavLink>
              </div>

              {/* Inventory Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Inventory
                </h3>
                <NavLink
                  to="/dashboard/manage-medicines"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaPills className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Manage Medicine</span>
                </NavLink>

                <NavLink
                  to="/dashboard/advertisement"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaBullhorn className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Advertisement</span>
                </NavLink>
              </div>

              {/* Financial Section */}
              <div className="mb-6">
                <h3 className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
                  Financial
                </h3>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaFileInvoiceDollar className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Payment History</span>
                </NavLink>
              </div>
            </>
          )}

          {!isAdmin && !isSeller && (
            <>
              {/* User Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 mb-6">
                <h2 className="text-white font-bold text-lg flex items-center">
                  <FaUser className="mr-2" />
                  User Portal
                </h2>
                <p className="text-purple-100 text-sm">Manage your profile</p>
              </div>

              <div className="space-y-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaHome className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Home</span>
                </NavLink>

                <NavLink
                  to="/update-profile"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUser className="text-blue-300 group-hover:text-blue-200 mr-3 text-sm" />
                  <span className="font-medium">Profile Update</span>
                </NavLink>
              </div>
            </>
          )}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white md:m-4 md:rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;