import { useRef, useEffect, useState } from "react";
import Navbar from "@/layouts/Navbar";
import { FaHeart, FaSync, FaEye, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "@/layouts/Footer";
import Banner from "@/layouts/Banner";
import { usePage } from '@inertiajs/react';
import { Paginator } from "primereact/paginator";

type Product = {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  weight: number;
  width: number;
  length: number;
  height: number;
  fragile: boolean;
  status: string;
  image: string;
};

const categories = [
  { image: "/image/l4.jpg", title: "I" },
  { image: "/image/l4.jpg", title: "Dont" },
  { image: "/image/l4.jpg", title: "Know" },
  { image: "/image/l4.jpg", title: "Nak" },
  { image: "/image/l4.jpg", title: "Letak" },
  { image: "/image/l4.jpg", title: "Apa" },
  { image: "/image/l4.jpg", title: "?" },
  { image: "/image/l4.jpg", title: "Cincai" },
  { image: "/image/l4.jpg", title: "Write" },
  { image: "/image/l4.jpg", title: "Can" },
  { image: "/image/l4.jpg", title: "Mah" },
  { image: "/image/l4.jpg", title: "?" },
];

const Main = () => {
  const { products } = usePage<{ products: Product[] }>().props;
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(8); // Number of products per page
  const [selectedCategory, setSelectedCategory] = useState<"all" | number>("all");

  // Reset to the first page when the selected category changes
  useEffect(() => {
    setFirst(0);
  }, [selectedCategory]);

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category_id))
  );

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category_id === selectedCategory);

  const paginatedProducts = filteredProducts.slice(first, first + rows);

  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 10, minutes: 34, seconds: 60 });

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

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for unused items." },
    { question: "How long does shipping take?", answer: "Shipping typically takes 5-7 business days." },
    { question: "Do you offer customer support?", answer: "Yes, our support team is available 24/7." },
  ];

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Paginator on page change
  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <main className="flex flex-col overflow-hidden">
      <Navbar />
      <Banner />

      {/* Category Section */}
      <section className="w-full bg-gray-100 py-18">
        <div className="max-w-7xl mx-auto px-6">
          {Array.from({ length: Math.ceil(categories.length / 6) }, (_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-6 gap-4 mb-6">
              {categories.slice(rowIndex * 6, rowIndex * 6 + 6).map((category, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white rounded-full shadow-md px-5 py-3 w-full"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden bg-gray-200">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="ml-3 text-gray-800 font-medium">{category.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

    {/* Product Section */}
<section className="container mx-auto p-20">
  <h2 className="text-2xl font-bold mb-4">PRODUCTS</h2>

  {/* Dynamic Category Navigation */}
  <div className="flex gap-4 mb-10 flex-wrap">
    <button
      onClick={() => setSelectedCategory("all")}
      className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
        selectedCategory === "all"
          ? "bg-red-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      All
    </button>

    {uniqueCategories.map((categoryId) => (
      <button
        key={categoryId}
        onClick={() => setSelectedCategory(categoryId)} // categoryId is a number
        className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
          selectedCategory === categoryId
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Category {categoryId}
      </button>
    ))}
  </div>

  {/* Product Cards */}
  <div className="flex overflow-x-auto gap-4 py-10 px-4">
    {paginatedProducts.map((product) => (
      <div
        key={product.id}
        className="min-w-[250px] max-w-[250px] bg-white rounded-2xl shadow-md flex flex-col items-center text-center p-4 relative"
      >
        {/* Product Image */}
        <div className="w-full h-36 mb-2 p-10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : null}
        </div>

        {/* Category */}
        <p className="text-xs text-gray-400 uppercase mb-1">Category {product.category_id}</p>

        {/* Product Name */}
        <h2 className="font-semibold text-sm text-gray-800 leading-tight mb-2">
          {product.name || "Product Name Goes Here"}
        </h2>

        {/* Pricing */}
        <div className="flex items-center justify-center gap-2 text-sm mb-1">
          <span className="text-red-600 font-bold">
            ${product.price.toFixed(2)}
          </span>
          <span className="line-through text-gray-400">$990.00</span>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center text-yellow-500 text-xs mb-2">
          {"★★★★★"}
        </div>

        {/* Icons */}
        <div className="flex justify-center gap-4 text-gray-500 text-sm mb-4">
          <FaHeart className="cursor-pointer hover:text-red-500" />
          <FaSync className="cursor-pointer hover:text-blue-500" />
          <FaEye className="cursor-pointer hover:text-green-500" />
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-red-500 text-white font-bold text-sm py-2 rounded-lg hover:bg-red-600 transition">
          ADD TO CART
        </button>
      </div>
    ))}
  </div>

  {/* Paginator Below Product Cards */}
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

      {/* Promotion Section */}
      <section className="flex w-full justify-between items-center bg-gray-100 p-8 rounded-lg shadow-md">
        <img src="/image/laptop.png" alt="Laptop" className="w-1/4 object-contain" />
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {["days", "hours", "minutes", "seconds"].map((unit, index) => (
              <div key={index} className="bg-red-500 text-white w-16 h-16 flex flex-col justify-center items-center rounded-full">
                <span className="text-2xl font-bold">
                  {timeLeft[unit as keyof typeof timeLeft]}
                </span>
                <span className="text-xs uppercase">{unit}</span>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold">HOT DEAL THIS WEEK</h2>
          <p className="text-gray-600">NEW COLLECTION UP TO 50% OFF</p>
          <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-red-700">
            SHOP NOW
          </button>
        </div>
        <img src="/image/headphone.png" alt="Headphones" className="w-1/4 object-contain" />
      </section>

      {/* FAQ Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-16 py-16 bg-gray-50">
        {/* Right Side - Image */}
        <div className="hidden md:flex w-2/5 justify-center">
          <img
            src="/image/headphone.png"
            alt="FAQ Illustration"
            className="w-3/4 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Left Side - FAQ Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center md:text-left">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center md:text-left">Find answers to common questions about our services.</p>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => handleClick(index)}
                  className="w-full flex justify-between items-center text-gray-900 font-medium p-4 transition-all hover:bg-gray-100"
                >
                  {faq.question}
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}
                  />
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-gray-50 text-gray-700 border-t border-gray-200"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Main;
