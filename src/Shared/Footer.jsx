// src/components/Footer.jsx
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeartbeat } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#031744] text-gray-300">
      {/* Wave Shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.3-168.06-17.29-250.32,0C413.58,31,330.69,72,251.7,92.83c-96.73,24.63-198.7,24.63-295.43,0V120H1280V92.83C1184.27,68.2,1082.39,68.2,985.66,92.83Z"
            className="fill-[#0f172a]"
          ></path>
        </svg>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 grid grid-cols-1 md:grid-cols-5 gap-10 relative">
        
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center space-x-2 py-4 border px-3 rounded-xl justify-start bg-white/5">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FaHeartbeat className="text-white text-xl" />
            </div>
            <h2 className="text-white font-semibold ">CareNest Pharmacy</h2>
          </div>
          <p className="text-sm leading-relaxed mt-3">
            Your health, our priority. Providing trusted and affordable medical care.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Medicines</a></li>
            <li><a href="#">Personal Care</a></li>
            <li><a href="#">Vitamins</a></li>
            <li><a href="#">Supplements</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">CareNest Digest</a></li>
            <li><a href="#">Health & Wellness</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase">Stay Updated</h3>
          <p className="text-sm mb-3">Sign up to get 10% off your first order</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email Address"
              className="px-3 py-2 w-full rounded-l-md text-black"
            />
            <button className="bg-yellow-500 text-black font-semibold px-4 rounded-r-md hover:bg-yellow-600">
              Subscribe
            </button>
          </div>
          {/* Social Links */}
          <div className="flex gap-4 mt-5 text-lg">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-sm py-4 text-center text-gray-500">
        © 2024 CareNest Pharmacy. All rights reserved. |
        <a href="#" className="ml-2 hover:text-white">Terms of Service</a> ·
        <a href="#" className="ml-2 hover:text-white">Privacy Policy</a> ·
   
      </div>
    </footer>
  );
};

export default Footer;
