// Carousel.tsx
import React, { useState } from 'react';
import ChevronIcon from '../svg-components/ChevronIcon';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goLeft = () => {
    setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div key={index} className="w-full flex-row flex justify-center items-center md:px-[10%] px-[12%] flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Left button */}
      <button onClick={goLeft} className="absolute left-1 rotate-180 top-1/2 -translate-y-1/2 bg-transparent p-1 rounded-full hover:bg-black/40">
        <ChevronIcon/>
      </button>

      {/* Right button */}
      <button onClick={goRight} className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent p-1 rounded-full hover:bg-black/40" >
        <ChevronIcon/>
      </button>
    </div>
  );
};

export default Carousel;
