// src/components/HammerAnimation.jsx
import React from "react";
import Lottie from "lottie-react";
import hammerAnim from "../assets/hammer.json"; // Ensure this path is correct

const HammerAnimation = ({ size = 150 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Lottie
        animationData={hammerAnim}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default HammerAnimation;

