// DiscountProducts.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DiscountProducts = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("https://y-plum-nine.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = Object.values(data).flat();
        setDiscountProducts(allProducts);
      })
      .catch((err) => console.error("Failed to fetch discount products:", err));
  }, []);

  const handleMoreInfo = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="container mx-auto py-10 ">
        {/* Section Title */}
        <h1 className="text-center text-3xl font-bold text-blue-600 mb-8">
          Discount Products
        </h1>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {discountProducts.map((product) => (
            <SwiperSlide
              key={product._id}
              className="bg-white rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl hover:border-blue-600 transition-all duration-300 flex flex-col overflow-hidden min-h-[420px] h-[420px]"
            >
              {/* Image & Discount Badge */}
              <div className="relative h-56 w-full flex items-center justify-center bg-blue-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-40 object-contain rounded-xl shadow-sm"
                />
                {typeof product.price === "number" &&
                  typeof product.discountPrice === "number" && (
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow z-10">
                      {`Save $${(product.price - product.discountPrice).toFixed(
                        2
                      )}`}
                    </span>
                  )}
              </div>

              {/* Product Info */}
              <div className="px-6 py-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-blue-700 uppercase mb-2 tracking-wide break-words">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base text-red-400 line-through font-medium">
                    ${product.price}
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {product.discountPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {product.description && product.description.length > 0
                    ? product.description
                    : "No description available for this product."}
                </p>
                <button
                  className="mt-auto w-full py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition"
                  onClick={() => handleMoreInfo(product)}
                >
                  More Info
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-32 w-32 object-contain mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              {selectedProduct.name}
            </h2>
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="text-base text-red-400 line-through font-medium">
                ${selectedProduct.price}
              </span>
              <span className="text-xl font-bold text-green-600">
                ${selectedProduct.discountPrice}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            {typeof selectedProduct.price === "number" &&
              typeof selectedProduct.discountPrice === "number" && (
                <div className="text-green-600 font-semibold text-center mb-2">
                  {`You save $${(
                    selectedProduct.price - selectedProduct.discountPrice
                  ).toFixed(2)}`}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default DiscountProducts;
