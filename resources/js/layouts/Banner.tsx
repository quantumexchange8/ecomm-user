import { Carousel } from "primereact/carousel";
import { useRef, useEffect, useState } from "react";
interface Banner {
    id: number;
    image: string;
    alt: string;
    title: string;
    subtitle: string;
  }
  
const banners: Banner[] = [
    { id: 1, image: "/image/l3.jpg", alt: "Sale Banner 1", title: "Best For Most People", subtitle: "Hot Trends of This Year" },
    { id: 2, image: "/image/l1.jpg", alt: "Sale Banner 2", title: "Best Premium", subtitle: "Hot Trends of This Year" },
    { id: 3, image: "/image/l4.jpg", alt: "Sale Banner 3", title: "Best Budget", subtitle: "Hot Trends of This Year" },
  ];
  
  const Banner = () => {
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
  return(
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
  )
}
export default Banner;