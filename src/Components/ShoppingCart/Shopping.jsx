import React, { useContext, useState } from "react";
import { useCartStore } from "../../store/useCartStore";
import { themeContext } from "../../App";
import { FiShoppingCart, FiX } from "react-icons/fi";
import Layout from "../Pages/Layout";

const products = [
  { id: 1, name: "Shoes", price: 1200 },
  { id: 2, name: "T-Shirt", price: 500 },
  { id: 3, name: "Watch", price: 2000 },
  { id: 4, name: "Tracker", price: 2500 },
  { id: 5, name: "Car", price: 200 },
  { id: 6, name: "Bike", price: 2700 },
];

export default function App() {
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCartStore();
    
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  const [openCart, setOpenCart] = useState(false);

  return (
    <Layout>
    <div
      className={`min-h-[84.40vh] p-8 transition-colors duration-300 font-sans ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
          Shopping Store
        </h1>

        <button
          onClick={() => setOpenCart(true)}
          className="relative bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600"
        >
          <FiShoppingCart size={20} />
          Cart
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className={`shadow-lg rounded-xl p-5 transition hover:shadow-2xl ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-500 dark:text-gray-300">₹{p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-4 bg-indigo-600 dark:bg-indigo-500 text-white w-full py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {openCart && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      )}
      <div
        className={`fixed top-16 right-0 h-full w-80 p-5 shadow-xl transition-transform duration-300 z-50 ${
          openCart ? "translate-x-0" : "translate-x-full"
        } ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            className="text-gray-500 hover:text-red-500"
            onClick={() => setOpenCart(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Cart is empty</p>
        ) : (
          <>
            <div className="space-y-3 overflow-y-auto max-h-[75vh] pr-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg flex justify-between items-center ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">₹{item.price} × {item.qty}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <button className="px-2 bg-gray-300 dark:bg-gray-600 rounded" onClick={() => decreaseQty(item.id)}>−</button>
                    <button className="px-2 bg-gray-300 dark:bg-gray-600 rounded" onClick={() => increaseQty(item.id)}>+</button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold mt-4">Total: ₹{totalPrice()}</h2>
          </>
        )}
      </div>
    </div>
    </Layout>
  );
}
