// src/components/SliderSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderSection = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://y-plum-nine.vercel.app/admin/advertisements"
      );
      setAdvertisements(response.data.filter((ad) => ad.in_slide));
    } catch (error) {
      console.error("Error fetching advertisements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center h-[28rem]">
          {/* Fancy loader */}
          <div className="flex justify-center items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
          </div>
        </div>
      ) : advertisements.length > 0 ? (
        <Slider {...settings}>
          {advertisements.map((ad) => (
            <div key={ad._id} className="relative">
              {/* Background image */}
              <img
                src={ad.image}
                alt={ad.mediName}
                className="object-cover w-full h-[28rem] md:h-[36rem] lg:h-[42rem] "
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-lg flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Your Health, Our Priority
                </h2>
                <p className="text-white text-lg md:text-xl mb-6 max-w-xl">
                  Providing compassionate care and quality medicine.
                </p>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex justify-center items-center h-[28rem] text-gray-500">
          No advertisements available
        </div>
      )}
    </div>
  );
};

export default SliderSection;
