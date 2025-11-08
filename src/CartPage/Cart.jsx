import React from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { Helmet } from "react-helmet-async";
import { useCart } from "./CartContext";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // 🔹 Calculate totals dynamically
  const calculateSubtotal = () =>
    cart.reduce(
      (acc, medicine) =>
        acc + (parseFloat(medicine.price) || 0) * (medicine.quantity || 1),
      0
    );

  return (
    <div className="container min-h-screen border-2 rounded-xl mx-auto mt-8 p-6 bg-white shadow">
      <Helmet>
        <title>CareNext Pharamacy | Cart</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border">Name</th>
                  <th className="py-3 px-4 border">Company</th>
                  <th className="py-3 px-4 border">Price</th>
                  <th className="py-3 px-4 border">Quantity</th>
                  <th className="py-3 px-4 border">Total</th>
                  <th className="py-3 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((medicine) => {
                  const price = parseFloat(medicine.price) || 0;
                  const quantity = parseInt(medicine.quantity, 10) || 1;
                  const total = price * quantity;

                  return (
                    <tr key={medicine._id} className="text-center">
                      <td className="py-3 px-4 border font-medium">
                        {medicine.name}
                      </td>
                      <td className="py-3 px-4 border">{medicine.company}</td>
                      <td className="py-3 px-4 border">${price.toFixed(2)}</td>
                      <td className="py-3 px-4 border flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(medicine._id, quantity - 1)
                          }
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(medicine._id, quantity + 1)
                          }
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </td>
                      <td className="py-3 px-4 border font-semibold">
                        ${total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 border">
                    <button
                          onClick={() => {
                            swal({
                              title: "Are you sure?",
                              text: `Remove ${medicine.name} from cart?`,
                              icon: "warning",
                              buttons: ["Cancel", "Yes, remove it!"],
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                removeFromCart(medicine._id);
                                swal("Removed!", `${medicine.name} has been removed.`, "success");
                              }
                            });
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <h3 className="text-xl font-bold">
              Subtotal: ${calculateSubtotal().toFixed(2)}
            </h3>
            <div className="flex gap-4 mt-4 md:mt-0">
       <button
           onClick={() => {
           swal({
             title: "Are you sure?",
             text: "This will remove all items from your cart!",
             icon: "warning",
             buttons: ["Cancel", "Yes, clear it!"],
             dangerMode: true,
           }).then((willDelete) => {
             if (willDelete) {
               clearCart();
           swal("Cleared!", "Your cart has been cleared.", "success");
      }
    });
  }}
  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
>
  Clear Cart
</button>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-12">
          <p className="text-lg">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Go to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
