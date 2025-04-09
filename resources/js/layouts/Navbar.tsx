import { AddCart, Language, Profile, Robot, Search, Wishlist } from "@/components/outline";
import { useState, useEffect } from "react";

const messages = [
    "Enjoy free shipping on orders RM100 up! ! !",
    "Limited time offer! Get 20% off on your first purchase",
    "Sign up and get exclusive discounts on new arrivals",
    "Hurry up! Offer expires soon",
  ];

const Navbar = () => {
    const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
  return (
 
        <div  className="flex flex-col">
            {/* Top Bar */}
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
            {/* Middle Section */}
            <div className="bg-gray-100 py-3 px-10 flex justify-between items-center text-sm">
                {/* Left Links */}
                <div className="flex space-x-6 text-gray-600">
                <a href="#" className="hover:text-black">About Us</a>
                <a href="#" className="hover:text-black">My Account</a>
                <a href="#" className="hover:text-black">Wishlist</a>
                <a href="#" className="hover:text-black">Order Tracking</a>
                </div>
                {/* Help & Contact */}
                <div className="flex items-center gap-3">
                <button>
                  <Profile/>
                </button>
                <button>
                    <AddCart/>
                </button>
                <button>
                   <Robot/>
                </button>
                <button> 
                  <Wishlist/>
                </button>
                <button>
                    <Language/>
                </button>
                </div>
            </div>
            {/* Main Navigation */}
            <nav className="py-4 px-10 flex justify-between items-center">
                {/* Logo & Categories */}
                <div className="flex items-center space-x-3">
                    <button className="text-black text-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    </button>
                    <div>
                        <span className="text-2xl font-bold"><img src="/image/current.png" alt="logo"/></span>
                    </div>
                </div>
                {/* search */}
                <div>
                    <form className="flex w-[500px] border border-black rounded">
                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 px-4 py-2 outline-none text-gray-700"
                        />

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="bg-black px-4 flex items-center justify-center"
                             >
                           <Search/>
                        </button>
                    </form>
                </div>
            </nav>
            <hr className="border-t border-gray-300" />
        </div>
     
  );
};

export default Navbar;
