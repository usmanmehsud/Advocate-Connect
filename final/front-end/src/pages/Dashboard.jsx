import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../Components/Banner";
import "../styles/dashboard.css";


const Dashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const images = ["/img1.png", "/img2.png", "/img3.png"];
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role"); // 'user' or 'lawyer'

  useEffect(() => {
    console.log("User role from URL:", role);
  }, [role]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 4-second fade cycle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <Banner />

      {/* Quote + Carousel Section */}
      <div className="quote-slider-section">
        <div className="quote-box">
          <h2>
            “A lawyer’s time and advice are his stock in trade. Justice delayed is justice denied.”
          </h2>
          <p>— Abraham Lincoln</p>
          <br />
          <hr />
          <br /><br />
          <h2>
            "A lawyer’s duty is not to bring peace through compromise, but to uphold justice even when the path is complex and uncertain. For in every courtroom battle, truth demands an unwavering advocate — one who stands firm not for reward, but for righteousness."
          </h2>
          <p>— Inspired by legal principles and professional ethics</p>
        </div>

        {/* Carousel section */}
        <div className="slider-box">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className={`carousel-image ${index === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/contact")}>Contact</button>
        <button onClick={() => navigate("/about")}>About</button>
      </div>

      {/* Hire a Lawyer Section */}
      <div className="hire-lawyer">
        <h3 id="pak">Need Legal Assistance?</h3>
        <p>Hire an expert lawyer for your case today. Get the best legal advice from top-rated professionals.</p>
        <button className="hire-button" onClick={() => navigate("/services")}>
          Hire a Lawyer
        </button>
      </div>

      {/* Footer */}
      <footer className="custom-footer">
        <div className="footer-content">
          <div className="footer-socials">
            <h4>Follow Us</h4>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="footer-map">
            <h4>Our Location</h4>
            <iframe
              title="Law Firm Location"
              src="https://www.google.com/maps/embed?pb=!1m18..."
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="footer-links">
            <h4>Useful Links</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Legal Resources</a>
          </div>
        </div>
        <p className="footer-bottom">&copy; 2025 LawFirm. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
