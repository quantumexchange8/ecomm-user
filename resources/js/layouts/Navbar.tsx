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
    <header className="flex flex-col">
        <div>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7d7e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/>
                    <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7d7e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7d7e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot">
                    <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/>
                    <path d="M20 14h2"/>
                    <path d="M15 13v2"/>
                    <path d="M9 13v2"/></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7d7e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7d7e8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                    <path d="M2 12h20"/></svg>
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
                            {/* Search Icon (SVG) */}
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-search"
                            >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            </svg>
                        </button>
                    </form>
                </div>
            

            </nav>
            <hr className="border-t border-gray-300" />
        </div>
     
    </header>
  );
};

export default Navbar;
