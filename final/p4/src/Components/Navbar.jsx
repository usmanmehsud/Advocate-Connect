



import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/Navbar.css";
import { isTokenExpired } from "../utility/auth";

const Navbar = () => {
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const token = localStorage.getItem("token");

  const toggleDropdown = () => {
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    } else {
      setDropdownVisible(!dropdownVisible);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (profile.role === "user") {
            navigate("/user-login");
          } else {
            navigate("/login");
          }
        });
      }
    });
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  const handleActiveCases = () => {
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    } else {
      profile.role === "user"
        ? navigate(`/activecasesuser/${profile._id}`)
        : navigate(`/activecaselawyer/${profile._id}`);
    }
  };

  const handleSrvices = () => {
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    } else {
      navigate("services");
    }
  };

  const profileRouteCheck = () => {
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    } else {
      navigate(`/profile/${profile._id}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-close dropdown after 5 seconds
  useEffect(() => {
    if (dropdownVisible) {
      timeoutRef.current = setTimeout(() => {
        setDropdownVisible(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [dropdownVisible]);

  const handleChangeLogin = (event) => {
    const value = event.target.value;
    if (!value) return;
    if (value === 'login-lawyer') {
      navigate('/login');
    }
    if (value === 'login-user') {
      navigate('/user-login');
    }
  };

  const handleChangeSignup = (event) => {
    const value = event.target.value;
    if (!value) return;
    if (value === 'signup-lawyer') {
      navigate('/signup');
    }
    if (value === 'signup-user') {
      navigate('/signup-user');
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        ⚖️ <span>Advocate Connect</span>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
        </li>
        <li>
          <p onClick={handleSrvices} className={isActive("/services")} style={{ cursor: "pointer", fontSize: "18px" }}>
            Services
          </p>
        </li>
        <li>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
        </li>
        <li>
          <p onClick={handleActiveCases} className={isActive("/active-cases")} style={{ cursor: "pointer", fontSize: "18px" }}>
            Active Cases
          </p>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }} to="/lawyerknoeldege" className={isActive("/lawyerknoeldege")}>
            Information-Portal
          </Link>
        </li>
      </ul>

      {!token && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <select
            onChange={handleChangeLogin}
            style={{
              padding: "6px",
              backgroundColor: "#1f2937",
              color: "white",
              cursor: "pointer",
              border: "1px solid #3f4856",
            }}
          >
            <option value="">Login</option>
            <option value="login-lawyer">Login Lawyer</option>
            <option value="login-user">Login User</option>
          </select>

          <select
            onChange={handleChangeSignup}
            style={{
              padding: "6px",
              backgroundColor: "#1f2937",
              color: "white",
              cursor: "pointer",
              border: "1px solid #3f4856",
            }}
          >
            <option value="">Signup</option>
            <option value="signup-lawyer">Signup Lawyer</option>
            <option value="signup-user">Signup User</option>
          </select>
        </div>
      )}

      {token && (
        <div className="profile-wrapper" ref={dropdownRef}>
          <div className="profile" onClick={toggleDropdown}>
            <img
              src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
              alt="profile"
              className="avatar"
            />
          </div>

          {dropdownVisible && (
            <div className="dropdown">
              {profile.role === "lawyer" && <button onClick={profileRouteCheck}>Profile</button>}
              <button onClick={handleLogout}>🚪 Log Out</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
