import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AboutPage.css";
import Footer from "./Footer";
import FAQSection from "./FAQSection";
import { useLocation } from 'react-router-dom';


const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDarkMode(stored);
    document.body.classList.toggle("dark-mode", stored);
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const elee = document.getElementById(targetId);
      
      if (elee) {
        // Use timeout to wait until DOM has rendered
        setTimeout(() => {
          elee.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);



  

  return (
    <div className={`about-page ${darkMode ? "dark" : ""}`}>
      

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Committed to Justice & Excellence</h1>
          <p>
            At <strong>Lex & Justice</strong>, we provide top-notch legal services
            driven by expertise, integrity, and client-centered advocacy.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <h2>Our Mission</h2>
        <p>
          To deliver unparalleled legal support with dedication, professionalism,
          and compassion—empowering individuals and businesses to overcome their
          legal challenges confidently.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <h2>What We Offer</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Criminal Defense</h3>
            <p>Expert representation in criminal cases with proven success.</p>
          </div>
          <div className="service-item">
            <h3>Corporate Law</h3>
            <p>Guidance on business formation, compliance, and disputes.</p>
          </div>
          <div className="service-item">
            <h3>Family Law</h3>
            <p>Compassionate support on divorce, custody, and adoption matters.</p>
          </div>
          <div className="service-item">
            <h3>Intellectual Property</h3>
            <p>Protection of your patents, trademarks, and copyrights.</p>
          </div>
          <div className="service-item">
            <h3>Real Estate Law</h3>
            <p>Legal advice for property transactions and disputes.</p>
          </div>
          <div className="service-item">
            <h3>Legal Consultation</h3>
            <p>Personalized advice tailored to your unique legal needs.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section">
        <h2>Client Testimonials</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Lex & Justice provided exceptional support throughout my case. Their
              professionalism and dedication made all the difference."
            </p>
            <h4>- Ayesha Khan</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Highly recommend! The team's expertise in corporate law helped me
              avoid major pitfalls in my startup."
            </p>
            <h4>- Ahmed Ali</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Compassionate and effective family law services. I felt truly
              supported during a difficult time."
            </p>
            <h4>- Maria Gomez</h4>
          </div>
        </div>
      </section>

      


<div id="faq21">
<FAQSection/>
</div>




      {/* Contact Section */}
      <section className="contact-section section">
        <h2>Get In Touch</h2>
        <p>
          Ready to discuss your case or schedule a consultation? Contact us today
          for professional legal assistance.
        </p>
        

<Link to="/contact" className="contact-button">
  Email Us
</Link>
      </section>
      <div className="new32">
      <Footer />
      </div>
    </div>
  );
};

export default AboutPage;