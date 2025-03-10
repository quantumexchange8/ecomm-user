import { Carousel } from "primereact/carousel";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/layouts/Navbar";
import { FaHeart, FaSync, FaEye, FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "@/layouts/Footer";
interface Banner {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface Product {
  id: number;
  image: string;
  category: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  isNew?: boolean;
  discount?: number;
}

const banners: Banner[] = [
  { id: 1, image: "/image/l3.jpg", alt: "Sale Banner 1", title: "Best For Most People", subtitle: "Hot Trends of This Year" },
  { id: 2, image: "/image/l1.jpg", alt: "Sale Banner 2", title: "Best Premium", subtitle: "Hot Trends of This Year" },
  { id: 3, image: "/image/l4.jpg", alt: "Sale Banner 3", title: "Best Budget", subtitle: "Hot Trends of This Year" },
];

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

const products: Product[] = [
  {
    id: 1,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 4,
    isNew: true,
  },
  {
    id: 2,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    discount: 30,
  },
  {
    id: 3,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    discount: 30,
  },
  {
    id: 4,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    discount: 30,
  },
  {
    id: 5,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    discount: 30,
  },
  {
    id: 6,
    image: "/image/l3.jpg",
    category: "Category",
    name: "Product Name Goes Here",
    price: 980.0,
    oldPrice: 990.0,
    rating: 5,
    discount: 30,
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="relative border rounded-xl p-5 text-center bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* New & Discount Labels */}
      {product.isNew && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          NEW
        </span>
      )}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{product.discount}%
        </span>
      )}

      {/* Product Image */}
      <div className="relative flex justify-center items-center p-4">
        <img
          src={product.image}
          alt="Product"
          className="w-full h-[180px] object-contain transition-all duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <p className="text-gray-400 text-sm uppercase tracking-wide">Category</p>
      <h3 className="font-bold text-lg mt-2">{product.name}</h3>
      <p className="text-red-500 text-xl font-bold mt-2">
        ${product.price}.00{" "}
        <span className="text-gray-400 line-through text-sm">${product.oldPrice}.00</span>
      </p>

      {/* Rating */}
      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`text-${i < product.rating ? "yellow" : "gray"}-500 text-lg`}>
            ★
          </span>
        ))}
      </div>

      {/* Wishlist, Compare, View Icons */}
      <div className="flex justify-center space-x-4 mt-3 text-gray-500">
        <FaHeart className="cursor-pointer hover:text-red-500 transition-all duration-200" />
        <FaSync className="cursor-pointer hover:text-blue-500 transition-all duration-200" />
        <FaEye className="cursor-pointer hover:text-green-500 transition-all duration-200" />
      </div>

      {/* Add to Cart Button Below Card */}
      <button className="mt-4 w-full py-3 bg-red-500 text-white font-bold uppercase tracking-wide rounded-lg hover:bg-red-600 transition-all duration-300">
        Add to Cart
      </button>
    </div>
  );
};



const Main = () => {
  const newProductsRef = useRef<HTMLDivElement>(null!);
  const topSellingRef = useRef<HTMLDivElement>(null!);  
  const AccessoryRef = useRef<HTMLDivElement>(null!);  
  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  
  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  
  

  const bannerTemplate = (banner: Banner) => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <img
        src={banner.image}
        alt={banner.alt}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.6] transition-all duration-700"
      />
      <div className="relative text-center text-white z-10 space-y-6 px-6">
        <h3 className="text-[40px] font-light tracking-widest uppercase opacity-80">
          {banner.subtitle}
        </h3>
        <h1 className="text-[80px] font-extrabold tracking-wide leading-tight">
          {banner.title}
        </h1>
        <button className="px-8 py-4 border border-white text-white text-lg font-medium uppercase tracking-wide rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out">
          Shop Now
        </button>
      </div>
    </div>
  );

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

  return (
    <main className="flex flex-col overflow-hidden">
      <Navbar />
      <div className="w-full h-screen overflow-hidden">
        <Carousel
          value={banners}
          itemTemplate={bannerTemplate}
          numVisible={1}
          numScroll={1}
          autoplayInterval={2000}
          circular
          showNavigators={false}
          showIndicators
          pt={{
            indicators: {
              className: "absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3",
            },
            indicator: {
              className:
                "w-6 h-1 rounded-full transition-all duration-300 bg-gray-500 hover:bg-gray-200 cursor-pointer",
            },
          }}
        />
      </div>

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
  <h2 className="text-2xl font-bold mb-4">NEW PRODUCTS</h2>
  <nav className="flex space-x-5 text-gray-500 uppercase text-sm">
    <span className="text-red-500 font-bold border-b-2 border-red-500">Laptops</span>
    <span className="cursor-pointer hover:text-red-500">Smartphones</span>
    <span className="cursor-pointer hover:text-red-500">Cameras</span>
    <span className="cursor-pointer hover:text-red-500">Accessories</span>
  </nav>

  <div className="relative mt-6">
  <div ref={newProductsRef} className="flex space-x-4 overflow-hidden">
  {products.map((product) => (
    <div key={product.id} className="flex-shrink-0 w-[250px]">
      <ProductCard product={product} />
    </div>
  ))}
</div>

    {/* Left & Right Navigation Buttons */}
    <button
  onClick={() => scrollLeft(newProductsRef)}
  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronLeft />
</button>
<button
  onClick={() => scrollRight(newProductsRef)}
  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronRight />
</button>
  </div>
</section>

{/* promotion */}
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

      {/* Right Product Image */}
      <img src="/image/headphone.png" alt="Headphones" className="w-1/4 object-contain" />
    </section>

    {/* top selling */}
    <section className="container mx-auto p-10">
  <h2 className="text-2xl font-bold mb-4">Top Selling</h2>
  <nav className="flex space-x-5 text-gray-500 uppercase text-sm">
    <span className="text-red-500 font-bold border-b-2 border-red-500">Laptops</span>
    <span className="cursor-pointer hover:text-red-500">Smartphones</span>
    <span className="cursor-pointer hover:text-red-500">Cameras</span>
    <span className="cursor-pointer hover:text-red-500">Accessories</span>
  </nav>

  <div className="relative mt-6">
    <div ref={topSellingRef} className="flex space-x-4 overflow-hidden">
      {products.map((product) => (
        <div key={product.id} className="flex-shrink-0 w-[250px]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* Left & Right Navigation Buttons */}
    <button
  onClick={() => scrollLeft(topSellingRef)}
  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronLeft />
</button>
<button
  onClick={() => scrollRight(topSellingRef)}
  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronRight />
</button>
  </div>
</section>
   {/* Accessory */}
   <section className="container mx-auto p-10">
  <h2 className="text-2xl font-bold mb-4">Top Selling</h2>
  <nav className="flex space-x-5 text-gray-500 uppercase text-sm">
    <span className="text-red-500 font-bold border-b-2 border-red-500">Laptops</span>
    <span className="cursor-pointer hover:text-red-500">Smartphones</span>
    <span className="cursor-pointer hover:text-red-500">Cameras</span>
    <span className="cursor-pointer hover:text-red-500">Accessories</span>
  </nav>

  <div className="relative mt-6">
    <div ref={AccessoryRef} className="flex space-x-4 overflow-hidden">
      {products.map((product) => (
        <div key={product.id} className="flex-shrink-0 w-[250px]">
          <ProductCard product={product} />
        </div>
      ))}
    </div>

    {/* Left & Right Navigation Buttons */}
    <button
  onClick={() => scrollLeft(AccessoryRef)}
  className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronLeft />
</button>
<button
  onClick={() => scrollRight(AccessoryRef)}
  className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-900 text-white p-3 rounded-full shadow-md hover:bg-gray-700 transition"
>
  <FaChevronRight />
</button>
  </div>
</section>

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
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
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
