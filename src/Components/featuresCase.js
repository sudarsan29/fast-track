import React, { useState, useEffect, useRef } from "react";
import features from "../data/features";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseRef = useRef(null);

  // Sticky effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!showcaseRef.current) return;

      const rect = showcaseRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
        showcaseRef.current.classList.add("sticky");
      } else {
        showcaseRef.current.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance features every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === features.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? features.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === features.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      ref={showcaseRef}
      className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-20 py-12 text-white bg-gradient-animated"
    >
      {/* Left side (Image + content) */}
      <div className="flex flex-col items-center md:items-start md:w-2/3">
        <img
          src={features[activeIndex].image}
          alt={features[activeIndex].title}
          className="h-[300px] w-[300px] object-contain transition-all duration-500 ease-in-out"
        />
        <h2 className="text-2xl md:text-4xl font-bold mt-6 text-gray-800">
          {features[activeIndex].title}
        </h2>
        <p className="text-gray-600 mt-4 text-center md:text-left max-w-lg">
          {features[activeIndex].description}
        </p>

        {/* Arrows */}
        <div className="flex mt-6 space-x-4">
          <button
            onClick={handlePrev}
            className="p-2 bg-blue-500 text-white shadow rounded-full hover:bg-blue-600 transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 bg-blue-500 text-white shadow rounded-full hover:bg-blue-600 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Right side (Clickable points) */}
      <div className="flex flex-col items-center md:items-start md:w-1/3 mt-10 md:mt-0 space-y-6">
        {features.map((feature, index) => (
          <button
            key={feature.id}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center space-x-3 text-left transition-all ${
              activeIndex === index ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full border-2 ${
                activeIndex === index
                  ? "bg-blue-600 border-blue-600"
                  : "border-gray-400"
              }`}
            ></span>
            <span className="font-medium">{feature.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeatureShowcase;
