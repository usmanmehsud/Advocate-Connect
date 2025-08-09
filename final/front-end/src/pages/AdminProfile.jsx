import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [profileData, setProfileData] = useState({
    username: "",
    age: "",
    cnic: "",
    qualification: "",
    email: "",
    phone: "",
    picture: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDark);
    if (storedDark) document.body.classList.add("dark-mode");

    const user = localStorage.getItem("adminProfile") || localStorage.getItem("userProfile");
    if (user) {
      const parsed = JSON.parse(user);
      setProfileData((prev) => ({
        ...prev,
        username: parsed.username || "",
        email: parsed.email || "",
        cnic: parsed.cnic || "",
        password: parsed.password || "", // if you store it (not recommended in plain text)
        picture: parsed.picture || "",
        role: parsed.role || "user",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCnicChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 13) value = value.slice(0, 13);
    let formatted = value;
    if (value.length > 5 && value.length <= 12) {
      formatted = `${value.slice(0, 5)}-${value.slice(5)}`;
    } else if (value.length > 12) {
      formatted = `${value.slice(0, 5)}-${value.slice(5, 12)}-${value.slice(12)}`;
    }
    setProfileData((prev) => ({ ...prev, cnic: formatted }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updated = { ...profileData, picture: imageUrl };
      setProfileData(updated);
      localStorage.setItem("adminProfile", JSON.stringify(updated));
    }
  };

  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token"); // Adjust key name as per your login logic
    if (!token) {
      toast.error("User not authenticated.");
      return;
    }

    const { username, phone, age, qualification, gender, picture } = profileData;

    const res = await axios.post(
      "http://localhost:5000/update-profile",
      { username, phone, age, qualification, gender, picture },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    localStorage.setItem("adminProfile", JSON.stringify(res.data.user));
    toast.success("✅ Profile updated successfully!");
  } catch (err) {
    console.error("Update failed:", err);
    toast.error("❌ Failed to update profile.");
  }
};


  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const avatarSrc = profileData.picture || "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg";

  return (
    <div className={`admin-profile-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="admin-profile-container">
        

        <h2 className="profile-title">
          👤 {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)} Profile
        </h2>
        <div className="profile-card">
          <div className="profile-image-section">
            <img
              src={avatarSrc}
              alt="Admin"
              className={`profile-image ${isImageLoaded ? "loaded" : "loading"}`}
              onLoad={() => setIsImageLoaded(true)}
              onError={() =>
                setProfileData((prev) => ({
                  ...prev,
                  picture: "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg",
                }))
              }
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="profile-info-section">
            <label>
              Name:
              <input type="text" name="username" value={profileData.username} onChange={handleChange} />
            </label>

            <label>
              Age:
              <input type="number" name="age" value={profileData.age} onChange={handleChange} />
            </label>

            <label>
              CNIC:
              <input
                type="text"
                name="cnic"
                value={profileData.cnic}
                onChange={handleCnicChange}
                placeholder="xxxxx-xxxxxxx-x"
                maxLength={15}
              />
            </label>

            <label>
              Qualification:
              <input type="text" name="qualification" value={profileData.qualification} onChange={handleChange} />
            </label>

            <label>
              Email:
              <input type="email" name="email" value={profileData.email} disabled />
            </label>

            <label>
              Phone:
              <input type="text" name="phone" value={profileData.phone} onChange={handleChange} />
            </label>

            <label>
              Password:
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
            </label>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminProfile;
