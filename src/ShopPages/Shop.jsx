import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useCart } from "../CartPage/CartContext";

const ShopPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart, updateQuantity, cart } = useCart(); // ✅ get cart functions

  useEffect(() => {
    axios
      .get("https://y-plum-nine.vercel.app/products")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleSelect = (medicine) => {
    const existingMedicine = cart.find((item) => item._id === medicine._id);
    if (existingMedicine) {
      updateQuantity(medicine._id, existingMedicine.quantity + 1);
      swal("Updated!", `Increased quantity of ${medicine.name}.`, "info");
    } else {
      addToCart({ ...medicine, quantity: 1 });
      swal("Added!", `${medicine.name} added to your cart.`, "success");
    }
  };

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAndSortedMedicines = medicines
    .filter((medicine) => {
      return (
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });

  const currentMedicines = filteredAndSortedMedicines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    filteredAndSortedMedicines.length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <Helmet>
        <title>CareNext Pharamacy | Shop</title>
      </Helmet>

      <div className="lg:max-w-[1440px] mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 bg-white inline-block px-4 py-2 rounded-lg shadow">
          Medicine Shop
        </h2>

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 w-full md:w-1/2 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <div className="flex items-center gap-3">
            <span className="text-gray-600 font-medium">Sort by Price:</span>
            <button
              onClick={() => handleSort("asc")}
              className={`px-3 py-1 rounded-md border shadow-sm ${
                sortOrder === "asc"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Asc
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`px-3 py-1 rounded-md border shadow-sm ${
                sortOrder === "desc"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Desc
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-center">Product</th>
                <th className="py-3 px-4 text-center">Company</th>
                <th className="py-3 px-4 text-center">Price</th>
                <th className="py-3 px-4 text-center">Discount Price</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMedicines.map((medicine) => (
                <tr
                  key={medicine._id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  {/* Product */}
                  <td className="py-6 text-center align-middle">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-12 h-12 rounded-md object-cover border"
                      />
                      <div className="text-left lg:w-44">
                        <p className="font-semibold text-xs md:text-base lg:text-lg w-full">
                          {medicine.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3 px-4 text-center align-middle text-gray-700">
                    {medicine.company}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-center align-middle line-through text-red-600 text-xl font-medium">
                    ${medicine.price}
                  </td>

                  {/* Discount */}
                  <td className="py-3 px-4 text-center align-middle text-2xl text-green-600 font-medium">
                    ${medicine.discountPrice}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center align-middle">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(medicine)}
                        className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100 flex items-center gap-1"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleSelect(medicine)}
                        className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 rounded-md border ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Modal */}
        {selectedMedicine && (
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 z-50 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedMedicine.name}</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-32 h-32 object-cover rounded-md mx-auto mb-4"
              />
              <p className="text-gray-700">
                <strong>Company:</strong> {selectedMedicine.company}
              </p>
              <p className="text-gray-700">
                <strong>Price:</strong> ${selectedMedicine.price}
              </p>
              <p className="text-gray-700">
                <strong>Discount Price:</strong> $
                {selectedMedicine.discountPrice}
              </p>
              <p className="text-gray-700">
                <strong>Description:</strong> {selectedMedicine.description}
              </p>
              <p className="text-gray-700">
                <strong>Category:</strong> {selectedMedicine.categoryName}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
