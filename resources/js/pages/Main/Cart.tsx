import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from '@inertiajs/react';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/fetch');
        if (response.data.cart) {
          setCartItems(response.data.cart.items.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.price,
            quantity: item.quantity,
            image: item.product.image || '/images/default-placeholder.png',
          })));
        }
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = isNaN(Number(item.price)) ? 0 : Number(item.price);
    const quantity = isNaN(Number(item.quantity)) ? 1 : Number(item.quantity);
    return acc + price * quantity;
  }, 0);

  const shipping = 5;

  const handleCheckout = async () => {
    try {
      const response = await axios.post('/store', {
        items: cartItems.map(item => ({
          product_id: item.id,
          price: item.price,
          quantity: item.quantity,
        })),
      });

      alert('Cart saved successfully!');
      localStorage.removeItem("cartItems");
      setCartItems([]);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to save cart.');
    }
  };

  const handleRemoveItem = async (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  
    try {
      await axios.post('/remove', {
        product_id: id
      });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };  

  const updateQuantityOnServer = async (id: number, quantity: number) => {
    try {
      await axios.post('/update', {
        product_id: id,
        quantity: quantity
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };
  
  const handleIncreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    const updatedItem = updatedCart.find(item => item.id === id);
    if (updatedItem) updateQuantityOnServer(id, updatedItem.quantity);
  };
  
  const handleDecreaseQuantity = (id: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
    const updatedItem = updatedCart.find(item => item.id === id);
    if (updatedItem && updatedItem.quantity > 0) updateQuantityOnServer(id, updatedItem.quantity);
  };
  

  return (
    <div className="w-full p-15 grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/default-placeholder.png';
                    }}
                  />
                  <div>
                    <p className="text-gray-600">Shirt</p>
                    <p className="font-bold">{item.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleDecreaseQuantity(item.id)} className="border px-2">-</button>
                  <input
                    type="text"
                    value={isNaN(item.quantity) ? 1 : item.quantity}
                    readOnly
                    className="w-8 text-center border"
                  />
                  <button onClick={() => handleIncreaseQuantity(item.id)} className="border px-2">+</button>
                </div>
                <p className="font-semibold">
                  RM {(isNaN(Number(item.price)) ? 0 : Number(item.price)) * (isNaN(Number(item.quantity)) ? 1 : Number(item.quantity))}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-gray-400 hover:text-black text-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => router.visit('/main')}
          className="mt-10 text-gray-700 hover:underline flex items-center gap-2"
        >
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
        <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-sm">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
