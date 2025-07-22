import React from "react";
import "../styles/Banner.css";

const Banner = () => {
  const handleClick = () => {
    window.location.href = "/hire";
  };

  return (
    <div className="banner">
      <button className="hire-button" onClick={handleClick}>Hire Advocate</button>
    </div>
  );
};

export default Banner;
