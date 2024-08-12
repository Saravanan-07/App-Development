import React, { useState } from 'react';
import './Carousel.css'; // Make sure to update the CSS file for styling

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Number of cards to show at a time
  const totalItems = React.Children.count(children);
  const itemsPerSlide = itemsToShow;
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= totalItems - itemsToShow + 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalItems - itemsToShow : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>
        &#10094;
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel-slides"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className="carousel-slide"
              style={{
                width: `${100 / itemsToShow}%`,
                flexShrink: 0,
              }}
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
