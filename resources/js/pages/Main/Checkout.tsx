import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [shipping] = useState(5); // flat shipping

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('/fetch');
        if (res.data.cart) {
          setCartItems(
            res.data.cart.items.map((item: any) => ({
              id: item.product.id,
              name: item.product.name,
              price: item.price,
              quantity: item.quantity,
              image: item.product.image || '/images/default-placeholder.png',
            }))
          );
        }
      } catch (err) {
        console.error('Failed to load cart', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleConfirmCheckout = async () => {
    try {
      const response = await axios.post('/checkout');
      alert('Order placed successfully!');
      router.visit('/orders'); // redirect to orders page or success page
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || 'Checkout failed.');
    }
  };

  if (loading) return <div className="p-10">Loading checkout...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between border-b pb-4">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">RM {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <div className="flex justify-between pt-4 font-semibold">
          <span>Subtotal</span>
          <span>RM {totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>RM {shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total</span>
          <span>RM {(totalPrice + shipping).toFixed(2)}</span>
        </div>

        <button
          onClick={handleConfirmCheckout}
          className="w-full bg-black text-white py-3 mt-4 rounded hover:bg-gray-800 transition"
        >
          Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
