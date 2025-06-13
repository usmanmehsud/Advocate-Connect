import React, { useEffect, useState } from "react";
import HammerAnimation from "../Components/HammerAnimation";
import "../styles/ContactPage.css";
import axios from "axios";
import Swal from 'sweetalert2';
import Footer from "./Footer";
import { toast } from "react-toastify";

const ContactPage = () => {

  const profile = JSON.parse(localStorage.getItem("userProfile"));

  // State to toggle dark mode
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState(profile?.email || '');
  const [message, setMessage] = useState('');
console.log(email)
  useEffect(() => {
    // Check the stored dark mode preference in localStorage
    const storedDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDark);
    document.body.classList.toggle("dark-mode", storedDark);
  }, []);

  // Toggle the dark mode
  const toggleDark = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
      setEmail(profile?.email||'')
      console.log(profile?.email||"")
    if (!name || !email || !message) {
      toast.warn("Please login before")
      return
    }
   
    try {
  const response = await axios.post(`http://localhost:5000/contact-with-admin`, {
    name,
    email,
    message,
  });

  Swal.fire({
    icon: 'success',
    title: 'Message sent successfully!',
    showConfirmButton: false,
    timer: 1500,
  });
  setMessage("")
  setName("")
} catch (error) {
  Swal.fire({
    icon: 'error',
    title: 'Failed to send message!',
    text: error.response?.data?.message || 'Please try again later.',
  });
}
}
  return (
    <div className={`contact-page-wrapper ${darkMode ? "dark" : ""}`}>

      
<div className="contact-page">
  <div className="contact-form-container">
    {/* Left Side - Contact Info */}
    <div className="contact-info">
      <h2>Contact <span>Us</span></h2>
      <p>Feel free to use the form or drop us an email. Old-fashioned phone calls work too.</p>
      <ul className="contact-details">
        <li>
          <span className="icon">📞</span>
          <a href="tel:4843242400">03045668984</a>
        </li>
        <li>
          <span className="icon">✉️</span>
          <a href="mailto:usmanmehsud3@gmail.com">usmanmehsud3@gmail.com</a>
        </li>
        <li>
          <span className="icon">📍</span>
          <address>
            Faislabad Punjab<br />
            Pakistan
          </address>
        </li>
      </ul>
    </div>

    {/* Right Side - Contact Form */}
    <div className="contact-form-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
       
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" required rows={5}></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</div>



      

      <div className="new33">
      <Footer />
      </div>
    </div>
  );
};

export default ContactPage;