import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeartbeat, FaShoppingCart } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useSeller from "../Hooks/useSeller";
import { useCart } from "../CartPage/CartContext";

// Add mobile menu state
const Navbar = () => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- NEW
  const { t, i18n } = useTranslation();
  const { logout, user } = useAuth();
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const handleAutoNavigation = async () => {
      if (!user && !isAdmin && !isSeller) {
        await logout();
        navigate("/");
      }
    };
    handleAutoNavigation();
  }, [user, isAdmin, isSeller, logout, navigate]);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Mobile menu toggle
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="bg-white shadow-sm py-3">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Hamburger for mobile - now on the left */}
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-2xl ">
              <FaHeartbeat className="text-white text-xl  " />
            </div>
            <div>
              <h2 className="font-semibold italic text-lg">
                CareNest Pharmacy
              </h2>
            </div>
          </div>
        </Link>

        {/* Links (desktop) */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-blue-600 font-semibold">
            {t("home")}
          </Link>
          <Link to="/shop" className="hover:text-blue-600 font-semibold">
            {t("shop")}
          </Link>
          {user && isAdmin && (
            <Link
              to="/dashboard/adminHome"
              className="hover:text-blue-600 font-semibold"
            >
              {t("dashboard")}
            </Link>
          )}
          {user && !isAdmin && isSeller && (
            <Link
              to="/dashboard/seller-dashboard"
              className="hover:text-blue-600 font-semibold"
            >
              {t("dashboard")}
            </Link>
          )}
          {user && !isAdmin && !isSeller && (
            <Link
              to="/dashboard/user-dashboard"
              className="hover:text-blue-600 font-semibold"
            >
              {t("dashboard")}
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown (desktop only) */}
          <div className="relative hidden md:block">
            <button
              className="border px-3 py-1 rounded-md text-sm hover:bg-gray-100"
              onClick={toggleLangDropdown}
            >
              {t("languages")}
            </button>
            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Français
                </button>
                <button
                  onClick={() => changeLanguage("bn")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  বাংলা
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={user.photoURL || "/images/client3.png"}
                    alt="User"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-lg w-40 z-20"
              >
                <li>
                  <Link to="/update-profile">{t("updateProfile")}</Link>
                </li>
                <li>
                  <button onClick={logout}>{t("logout")}</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signup">
              <button className="btn btn-sm btn-primary">{t("joinUs")}</button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden flex flex-col justify-between`}
        >
          <div className="flex flex-col gap-2 py-6 px-6">
            {/* Close button */}
            <button
              className="self-end mb-2 p-2 rounded-full hover:bg-blue-50 transition"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              to="/"
              className="w-full py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold transition"
              onClick={toggleMobileMenu}
            >
              {t("home")}
            </Link>
            <Link
              to="/shop"
              className="w-full py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold transition"
              onClick={toggleMobileMenu}
            >
              {t("shop")}
            </Link>
            {user && isAdmin && (
              <Link
                to="/dashboard/adminHome"
                className="w-full py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold transition"
                onClick={toggleMobileMenu}
              >
                {t("dashboard")}
              </Link>
            )}
            {user && !isAdmin && isSeller && (
              <Link
                to="/dashboard/seller-dashboard"
                className="w-full py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold transition"
                onClick={toggleMobileMenu}
              >
                {t("dashboard")}
              </Link>
            )}
            {user && !isAdmin && !isSeller && (
              <Link
                to="/dashboard/user-dashboard"
                className="w-full py-2 px-3 rounded-lg hover:bg-blue-50 text-blue-600 font-semibold transition"
                onClick={toggleMobileMenu}
              >
                {t("dashboard")}
              </Link>
            )}
            {/* Language Dropdown (mobile) */}
            <div className="relative w-full mt-2">
              <button
                className="border border-blue-200 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 w-full text-left transition"
                onClick={toggleLangDropdown}
              >
                {t("languages")}
              </button>
              {isLangDropdownOpen && (
                <div className="mt-2 w-full bg-white border border-blue-200 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage("fr")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => changeLanguage("bn")}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-blue-600"
                  >
                    বাংলা
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Footer in mobile menu */}
          <div className="px-6 pb-6 text-center">
            <hr className="mb-4 border-blue-200" />
            <div className="text-xs text-blue-600 flex flex-col gap-1">
              <span>&copy; {new Date().getFullYear()} CareNest Pharmacy</span>
              <span>
                <a
                  href="mailto:support@carenest.com"
                  className="underline hover:text-blue-800 transition"
                >
                  support@carenest.com
                </a>
              </span>
              <span>
                <a
                  href="https://carenest.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-blue-800 transition"
                >
                  Privacy Policy
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
