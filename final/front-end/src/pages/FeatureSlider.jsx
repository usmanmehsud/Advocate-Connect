import React, { useState, useEffect } from "react";
import slide1 from '../assets/slide1.webp';
import slide2 from '../assets/slide7.webp';
import slide3 from '../assets/slide8.jpeg';
import slide4 from '../assets/slide4.jpeg';
import slide6 from '../assets/slide6.jpg';
import '../styles/home.css'

const FeatureSlider = () => {
  const cards = [
    { id: 1, image: slide1 },
    { id: 2, image: slide2 },
    { id: 3, image: slide3 },
    { id: 4, image: slide4 },
    { id: 5, image: slide6 },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  // 👇 Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [cards.length]);

  return (
    <div className="feature-slider-container">
      <h2 className="feature-slider-title">Features</h2>
      <div className="feature-slider">
        <button className="slider-arrow" onClick={handlePrev}>
          &#8249;
        </button>

        <div className="slider-cards-wrapper">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`slider-card ${index === activeIndex ? "slider-card-active" : ""}`}
            >
              <img
                src={item.image}
                alt={`Card ${item.id}`}
                className="card-image"
              />
            </div>
          ))}
        </div>

        <button className="slider-arrow" onClick={handleNext}>
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default FeatureSlider;
