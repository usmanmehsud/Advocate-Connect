import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./User.css";

const User = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileKey, setProfileKey] = useState("adminProfile"); // default to adminProfile

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDark);
    if (storedDark) document.body.classList.add("dark-mode");

    // Check which profile is available (admin or user)
    const admin = localStorage.getItem("adminProfile");
    const user = localStorage.getItem("userData");

    if (admin) {
      setProfileKey("adminProfile");
      setProfileData(JSON.parse(admin));
    } else if (user) {
      setProfileKey("userData");
      setProfileData(JSON.parse(user));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return; // prevent email edits
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(profileKey, JSON.stringify(profileData));
    toast.success("✅ Profile updated successfully!");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <center>
      <div className={`admin-profile-wrapper ${darkMode ? "dark" : ""}`}>
        <div className={`admin-profile-container ${darkMode ? "dark" : ""}`}>
          <button className="toggle-icon" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <h2 className="profile-title">👤 User Profile</h2>

          <div className="profile-info-section">
            <label className="profile-label">
              Name:
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
            </label>

            <label className="profile-label">
              Email:
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
              />
            </label>

            <label className="profile-label">
              Password:
              <div className="input-with-icon">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleChange}
                />
                <button
                  className="toggle-password"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🔒" : "👁️"}
                </button>
              </div>
            </label>
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
          <ToastContainer />
        </div>
      </div>
    </center>
  );
};

export default User;
