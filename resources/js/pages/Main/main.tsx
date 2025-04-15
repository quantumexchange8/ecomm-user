import { useRef, useEffect, useState } from "react";
import { FaHeart, FaSync, FaEye, FaChevronDown } from "react-icons/fa";
import Footer from "@/layouts/Footer";
import Banner from "@/layouts/Banner";
import { usePage } from '@inertiajs/react';
import { Paginator } from "primereact/paginator";
import { AddCart, Language, Profile, Robot, Search, Wishlist } from "@/components/outline";
import { router } from '@inertiajs/react';
import axios from "axios";

const messages = [
  "Enjoy free shipping on orders RM100 up! ! !",
  "Limited time offer! Get 20% off on your first purchase",
  "Sign up and get exclusive discounts on new arrivals",
  "Hurry up! Offer expires soon",
];

type Product = {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category_name: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  fragile: boolean;
  status: string;
  image: string | null; 
};

const Main = () => {
  const { products } = usePage<{ products: Product[] }>().props;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState<"all" | number>("all");
  const [cartItems, setCartItems] = useState<Product[]>(() => {
  const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [showCart, setShowCart] = useState(false); 
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 10, minutes: 34, seconds: 60 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [getProductListing, setGetProductListing] = useState<Product[]>([]);
 
  useEffect(() => {
    fetchProductListing();
}, []);
  const fetchProductListing = async () => {
    try {

      const response = await axios.get('/getProductListing');
      
      setGetProductListing(response.data);

    } catch (error) {
        console.error('error', error);
    }
  }
  
  const faqs = [
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for unused items." },
    { question: "How long does shipping take?", answer: "Shipping typically takes 5-7 business days." },
    { question: "Do you offer customer support?", answer: "Yes, our support team is available 24/7." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setFirst(0);
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleAddToWishlist = async (product: Product) => {
    try {
      await axios.post('/wishlistAdd', {
        product_id: product.id,
      });
      alert('Item added to wishlist!');
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
      alert('Failed to add item to wishlist.');
    }
  };
  
  const handleAddToCart = async (product: Product) => {
    try {
      await axios.post('/add', {
        product_id: product.id,
        quantity: 1, // or however many they choose
        price: product.price,
      });
  
      alert('Item added to cart!');
    } catch (error) {
      console.error('Failed to add item:', error);
      alert('Failed to add item to cart.');
    }
  };

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const uniqueCategories = Array.from(
    new Map(
      getProductListing.map((product) => [product.category_id, product.category_name])
    ).entries()
  );
  
  const filteredProducts =
    selectedCategory === "all"
      ? getProductListing
      : getProductListing.filter((p) => p.category_id === selectedCategory);

  const paginatedProducts = filteredProducts.slice(first, first + rows);

  return (
    <main className="flex flex-col overflow-hidden">
      {/* TOP BAR */}
      <div className="flex flex-col">
        <div className="bg-black text-white text-sm py-2 flex justify-center overflow-hidden h-10">
          <div className="relative h-full w-full flex items-center justify-center">
            {messages.map((msg, i) => (
              <span
                key={i}
                className={`absolute transition-all duration-1000 ease-in-out transform ${
                  i === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                {msg}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 py-3 px-10 flex justify-between items-center text-sm">
          <div className="flex space-x-6 text-gray-600">
            <a href="#" className="hover:text-black">About Us</a>
            <a href="#" className="hover:text-black">My Account</a>
            <a href="/wishlist" className="hover:text-black">Wishlist</a>
            <a href="#" className="hover:text-black">Order Tracking</a>
          </div>
          <div className="flex items-center gap-3">
            <button><Profile /></button>
            <button
              onClick={() => router.visit('/cart')}
              className="relative"
              >
              <AddCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button><Robot /></button>
            <button><Wishlist /></button>
            <button><Language /></button>
          </div>
        </div>
        <nav className="py-4 px-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button className="text-black text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
            <div><span className="text-2xl font-bold"><img src="/image/current.png" alt="logo" /></span></div>
          </div>
          <form className="flex w-[500px] border border-black rounded">
            <input type="text" placeholder="Search..." className="flex-1 px-4 py-2 outline-none text-gray-700" />
            <button type="submit" className="bg-black px-4 flex items-center justify-center">
              <Search />
            </button>
          </form>
        </nav>
        <hr className="border-t border-gray-300" />
      </div>
      <Banner />
      {/* CATEGORY SECTION */}
      <section className="w-full items-center justify-center bg-gray-100 py-18">
        <div className="max-w-7xl mx-auto px-6">
          {Array.from({ length: Math.ceil(uniqueCategories.length / 4) }, (_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-4 mb-6">
            {uniqueCategories.slice(rowIndex * 4, rowIndex * 4 + 4).map(([categoryId, categoryName], index) => (
                  <div key={index} className="flex items-center bg-white rounded-full shadow-md px-5 py-3 w-full">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-gray-200">
                    </div>
                    <span className="ml-3 text-gray-800 font-medium">{categoryName}</span>
                  </div>
                ))}
          </div>
          ))}
        </div>
      </section>
      {/* PRODUCTS */}
      <section className="container mx-auto p-20">
        <h2 className="text-2xl font-bold mb-4">PRODUCTS</h2>
        <div className="flex gap-4 mb-10 flex-wrap">
          <button onClick={() => setSelectedCategory("all")} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === "all" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>All</button>
          {uniqueCategories.map(([categoryId, categoryName]) => (
            <button
              key={categoryId}
              onClick={() => setSelectedCategory(categoryId)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === categoryId ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              {categoryName}
            </button>
          ))}
        </div>
        <div className="flex overflow-x-auto gap-4 py-10 px-4">
          {paginatedProducts.map((product: Product) => (
            <div key={product.id} className="min-w-[250px] max-w-[250px] bg-white rounded-2xl shadow-md flex flex-col items-center text-center p-4 relative">
              <div className="w-full h-36 mb-2 p-10">
                <img
                  src={product.image || "/image/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="flex flex-col text-xs text-gray-400 uppercase mb-1">{product.category_name}</span>
              <h2 className="font-semibold text-sm text-gray-800 leading-tight mb-2">{product.name}</h2>
              <div className="flex items-center justify-center gap-2 text-sm mb-1">
                <span className="text-red-600 font-bold">RM{product.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-center text-yellow-500 text-xs mb-2">{"★★★★★"}</div>
              <div className="flex justify-center gap-4 text-gray-500 text-sm mb-4">
              <FaHeart
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => handleAddToWishlist(product)}
                />

                <FaSync className="cursor-pointer hover:text-blue-500" />
                <FaEye className="cursor-pointer hover:text-green-500" />
              </div>
              <button onClick={() => handleAddToCart(product)} className="w-full bg-red-500 text-white font-bold text-sm py-2 rounded-lg hover:bg-red-600 transition">ADD TO CART</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredProducts.length}
            rowsPerPageOptions={[5, 10]}
            onPageChange={onPageChange}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Main;
