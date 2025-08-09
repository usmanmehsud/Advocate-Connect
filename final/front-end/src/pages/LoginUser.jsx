import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Login.css";
import { toast } from "react-toastify";
const LoginUser = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        Swal.fire("Error", data.message || "Login failed", "error");
        return;
      }

      // Store token or user data if needed
      localStorage.setItem("token", data.token);
      localStorage.setItem("userProfile", JSON.stringify(data.user));

      Swal.fire("Login Successful", "", "success").then(() => {
        navigate("/");
      });
    } catch (err) {
      toast.error("Login failed: " + err.message);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="h">
      <div class="wrap">
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
        <div class="tri"></div>
      </div>
      <form onSubmit={handleLogin} className="login-form">
        <h2>User Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="in"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="in"
        />
        {error && <p className="error-message">{error}</p>}
        <button className="out" type="submit">
          Login
        </button>
        <div className="login-link">
          <p>
            If you don't have an account
            <br /> <Link to="/signup-user">Signup</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
