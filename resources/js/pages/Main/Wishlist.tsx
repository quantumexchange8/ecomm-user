import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/wishlistfetch');
      setWishlist(response.data.wishlistItems.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image:
          item.product.media.length > 0
            ? item.product.media[0].original_url
            : '/image/placeholder.jpg',
      })));
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      await axios.post('/wishlistRemove', { product_id: productId });
      setWishlist(wishlist.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-red-500 font-bold mt-2">RM {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemove(product.id)}
                className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        {wishlist.length === 0 && (
          <p className="col-span-full text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
