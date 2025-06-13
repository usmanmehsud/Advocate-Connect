import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignupSelection.css";

const SignupSelection = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedMode);
    document.body.classList.toggle("dark-mode", storedMode);
  }, []);

  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className={`selection-container ${darkMode ? "dark" : ""}`}>
      <button className="mode-toggle" onClick={toggleDark}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="selection-card">
        <h1 className="selection-title">Choose Your Login Type</h1>
        <div className="button-group">
          
        {/* // SignupSelection.jsx */}
          <button
          className="select-btn admin"
          onClick={() => navigate("/login", { state: { role: "lawyer" } })}
          >
            🛡️ Login as Advocate
          </button>
          <button
          className="select-btn user"
          onClick={() => navigate("/user-login", { state: { role: "user" } })}
          >
            👤 Login as User
          </button>


        </div>
      </div>
    </div>
  );
};

export default SignupSelection;
