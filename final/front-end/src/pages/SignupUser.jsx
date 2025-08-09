import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Signup.css";

const SignupUser = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const initialRole = location.state?.role || "user";

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    role: initialRole,
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDark = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return password.length >= 8 && specialCharRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, gender } = form;

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and include a special character.");
      return;
    }

    if (!gender) {
      setError("Please select a gender.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed.");
        return;
      }

      setIsOtpSent(true);
      Swal.fire("OTP Sent", "Check your email for the OTP.", "info");
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/verify-user-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "OTP verification failed.");
        return;
      }

      Swal.fire("Success", "You are now registered!", "success").then(() => {
        if (form.role === "lawyer") {
          navigate("/login");
        } else {
          navigate("/user-login");
        }
      });
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className={`signup ${darkMode ? "dark" : ""}`}>
      <form
        className="signup-form"
        onSubmit={isOtpSent ? (e) => { e.preventDefault(); handleVerifyOtp(); } : handleSignup}
      >
        <h2 className="you">Signup Page</h2>

        {!isOtpSent && (
          <div className="form-columns">
            {/* Left Column */}
            <div className="form-column">
              <input
                className="in"
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <input
                className="in"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="in"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Right Column */}
            <div className="form-column">
              <label className="form-label">Gender:</label>
              <select
                className="sel"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Custom</option>
              </select>

              <label className="form-label">Phone:</label>
              <input
                className="in"
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {isOtpSent && (
          <input
            className="in"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        )}

        {error && <p className="error-message">{error}</p>}

        <button className="out" type="submit">
          {isOtpSent ? "Verify OTP" : "Sign Up"}
        </button>
      </form>

      <div className="login-link">
        <p>If you already have an account, <Link to="/user-login">go to login page</Link>.</p>
      </div>
    </div>
  );
};

export default SignupUser;
