import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 5;

  return (
    <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left - Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-6"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="text-gray-600">Shirt</p>
                    <p className="font-bold">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="border px-2">-</button>
                  <input
                    type="text"
                    value="1"
                    readOnly
                    className="w-8 text-center border"
                  />
                  <button className="border px-2">+</button>
                </div>
                <p className="font-semibold">RM {item.price.toFixed(2)}</p>
                <button className="text-gray-400 hover:text-black text-xl">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button className="mt-10 text-gray-700 hover:underline flex items-center gap-2">
          ← Back to shop
        </button>
      </div>

      {/* Right - Summary */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Summary</h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">ITEMS {cartItems.length}</span>
          <span className="font-semibold">RM {totalPrice.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">SHIPPING</p>
          <select className="w-full border px-4 py-2">
            <option>Standard-Delivery- RM{shipping.toFixed(2)}</option>
          </select>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold mb-1">GIVE CODE</p>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your code"
              className="w-full border px-4 py-2"
            />
            <button className="px-4 bg-white border">→</button>
          </div>
        </div>
        <div className="flex justify-between mt-6 mb-4 font-bold text-lg">
          <span>TOTAL PRICE</span>
          <span>RM {(totalPrice + shipping).toFixed(2)}</span>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-sm">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
