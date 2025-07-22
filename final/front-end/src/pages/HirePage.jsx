import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HirePage.css";

const HirePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDarkMode(stored);
    document.body.classList.toggle("dark-mode", stored);

    const fetchLawyers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lawyers");
        setLawyers(res.data);
      } catch (err) {
        console.error("Failed to fetch lawyers", err);
      }
    };

    fetchLawyers();
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className="hire-page">
      <button className="toggle-icon" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <section className="hero">
        <h1>Find the Right Advocate for Your Needs</h1>
        <p>Experienced legal professionals available for consultation and representation.</p>
        <button className="cta-button">Hire Now</button>
      </section>

      <section className="advocate-list">
        {lawyers.map((lawyer) => (
          <div key={lawyer._id} className="advocate-card">
            <img
              src={lawyer.picture || "https://via.placeholder.com/100"}
              alt={lawyer.username}
            />
            <h3>{lawyer.username}</h3>
            <p>{lawyer.qualification || "Experienced Legal Professional"}</p>
            <p>Phone: {lawyer.phone || "N/A"}</p>
            <p>Email: {lawyer.email}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HirePage;
