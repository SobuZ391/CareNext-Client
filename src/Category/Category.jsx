import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Category = () => {
  const navigate = useNavigate();
  const [medicineCategories, setMedicineCategories] = useState([]);

  useEffect(() => {
    fetch("https://y-plum-nine.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.categoryName))
        ).map((categoryName) =>
          data.find((item) => item.categoryName === categoryName)
        );
        setMedicineCategories(uniqueCategories);
      })
      .catch((error) =>
        console.error("Error fetching medicine categories:", error)
      );
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="container mx-auto py-12 relative">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 relative inline-block">
          Medicine Categories
          <span className="block w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-2 rounded-full"></span>
        </h1>
      </div>

      {/* Swiper */}
      <div className="relative">
        <Swiper
          slidesPerView={3}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {medicineCategories.map((category, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCategoryClick(category.categoryName)}
                className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 flex flex-col items-center text-center"
              >
                {/* Circle Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition mb-4">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-16 h-16 object-contain rounded-full"
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {category.categoryName}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed">
                  {category.description ||
                    "Explore medicines in this category."}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <div
          className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 
                        bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white 
                        w-12 h-12 flex items-center justify-center rounded-full shadow-md cursor-pointer z-20"
        >
          ‹
        </div>
        <div
          className="custom-next absolute right-2 top-1/2 -translate-y-1/2 
                        bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white 
                        w-12 h-12 flex items-center justify-center rounded-full shadow-md cursor-pointer z-20"
        >
          ›
        </div>
      </div>
    </div>
  );
};

export default Category;
