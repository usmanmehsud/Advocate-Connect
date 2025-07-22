import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDark);
    if (storedDark) document.body.classList.add("dark-mode");
  }, []);

  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  const email = form.email.trim().toLowerCase();
  const password = form.password.trim();

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // Ensure proper body format
    });

    const data = await res.json();
    if (!res.ok) {
      Swal.fire({
        title: "Invalid Credentials",
        text: data.message || "Please check your email or password.",
        icon: "error",
      });
      return;
    }

  
      // Store user profile in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userProfile", JSON.stringify(data.user));
  
      Swal.fire({
        title: "Login Successful!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Redirect based on role
        const role = data.user?.role || "user";

        if (role === "lawyer") {
          navigate(`/home`);
        } else if (role === "user") {
          navigate(`/user-dashboard?role=user`);
        } else {
          navigate(`/dashboard?role=guest`);
        }
      });
  
    } catch (err) {
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };
  

  return (
    <div className={`login ${darkMode ? "dark" : ""}`}>
      {/* <div class='wrap'>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
  <div class='tri'></div>
</div> */}

      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="me">Login Lawyer</h2>
        <input
          className="t1"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="t1"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit">Login</button>
      <div className="login-link">
        <p>
          If you don't have an account<br/> {" "}
          <Link to="/signup">signup page</Link>.
        </p>
      </div>
      </form>

    </div>
  );
};

export default Login;
