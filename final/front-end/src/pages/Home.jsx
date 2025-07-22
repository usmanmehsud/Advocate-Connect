import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import FeatureSlider from "./FeatureSlider";
import "../styles/home.css";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom"; // At the top
import { isTokenExpired } from "../utility/auth";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [ratingLawers, setRatingLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [users, setUsers] = useState([]);
  const [cases, setCases] = useState([]);

  const navigateToService = () => {
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    } else {
      navigate("/services");
    }

    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const targetId = location.hash.replace("#", "");
        const element = document.getElementById(targetId);
        const ele = document.getElementById(targetId);
        if (element) {
          // Use timeout to wait until DOM has rendered
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
        if (ele) {
          // Use timeout to wait until DOM has rendered
          setTimeout(() => {
            ele.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }, [location]);
  };

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lawyers");
        setLawyers(res.data)
        const ratedLawyers = res.data;
        // console.log(ratedLawyers)
        const highRatedLawyers = ratedLawyers
          .filter(item => item.averageRating) // only those who have a rating
          .sort((a, b) => b.averageRating - a.averageRating) // sort descending
          .sort((a, b) => b.ratings.length - a.ratings.length) // sort descending
          .slice(0, 3); // pick top 3
        setRatingLawyers(highRatedLawyers);
      } catch (err) {
        console.error("Failed to fetch high rated lawyers lawyer's ", err);
      }
    };
    fetchLawyers();
  }, []);
  // console.log(ratingLawers)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data)
      } catch (err) {
        console.error("Failed to fetch users ", err);
      }
    };
    fetchUsers();
  }, []);
  // get active cases
  useEffect(() => {
    const fetchActiveCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/activecases");
        setCases(res.data)
      } catch (err) {
        console.error("Failed to fetch active cases ", err);
      }
    };
    fetchActiveCases();
  }, []);
  const images = [
    "https://media.istockphoto.com/id/1155363752/photo/legal-counsel-presents-to-the-client-a-signed-contract-with-gavel-and-legal-law-justice-and.jpg?s=612x612&w=0&k=20&c=sXYi5WSO6XLFgpFDdO0o9fNYUqMm7C3YIiFMTa5LYoY=",
    "https://media.istockphoto.com/id/1598910684/photo/judge-gavel-deciding-on-marriage-divorce-signing-papers-lawyer-concept.jpg?s=612x612&w=0&k=20&c=AGVLs6YTCHNrd42jtCDISV1MyWK6WVeoB0L4sNIM6qM=",
    // "https://media.istockphoto.com/id/1022781920/photo/judge-gavel-with-justice-lawyers-business-people-and-lawyers-discussing-about-agreement.jpg?s=612x612&w=0&k=20&c=1i51ELQtncYjMMU-QtAl4K9FIV6CX3Ms2ENtMd5PIJs="
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); // change image every 4 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <>


      <div className="home">
        <div className="headerhome">
          <div
            className="mainheaderimg"
            style={{ backgroundImage: `url(${images[currentImage]})` }}
          >
            <div className="left text-white bg-dark bg-opacity-50  c">
              <h1>Lex & Justice</h1>
              <p>
                At Lex & Justice, we believe that justice should be accessible
                to all. That's why we offer transparent communication,
                compassionate service, and relentless advocacy. Trust us to
                navigate the legal system with clarity and determination —
                because when your future is on the line, you deserve nothing
                less than dedicated legal champions.
              </p>
              <div className="buttons">
                <button className="btnheader" onClick={navigateToService}>
                  Our Services
                </button>
                <button
                  className="btnheader"
                  onClick={() => navigate("/about")}
                >
                  About Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="practice-areas" id="practice-area">
        <h2>Our Practice Areas</h2>
        <p>
          We provide strategic, personalized legal counsel across key areas of
          practice to help you navigate challenges and protect your interests.
        </p>
        <div className="area-cards">
          <div className="card">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/scales.png"
              alt="Criminal Law Icon"
            />
            <h3>Criminal Law</h3>
            <p>
              Fierce defense and experienced representation in all criminal
              proceedings.
            </p>
          </div>
          <div className="card">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/family.png"
              alt="Family Law Icon"
            />
            <h3>Family Law</h3>
            <p>
              Guidance through divorce, custody, and family court matters with
              empathy.
            </p>
          </div>
          <div className="card">
            <img
              src="https://img.icons8.com/ios-filled/100/ffffff/briefcase.png"
              alt="Corporate Law Icon"
            />
            <h3>Corporate Law</h3>
            <p>
              Comprehensive business legal services, from startups to
              enterprises.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <header className="hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <h1 id="h1">Justice & Integrity</h1>
            <p id="p1">Trusted Legal Solutions for Modern Challenges</p>
            <button id="btn1" onClick={() => navigate("/services")}>
              Schedule a Consultation
            </button>
          </div>
        </header>


        <section className="testimonials">
          <h2>Our Progress</h2>
          <div className="testimonial-row" >
            <div className="testimonial" style={{ backgroundColor: "#bdd6e0" }}>
              <h1>Current Lawyers: {lawyers.length}</h1>
            </div>
            <div className="testimonial" style={{ backgroundColor: "#bdd6e0" }}>
              <h1>Current Users: {users.length}</h1>

            </div>
            <div className="testimonial" style={{ backgroundColor: "#bdd6e0" }}>
              <h1>Active Cases: {cases.length}</h1>

            </div>
          </div>
        </section>

        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>About Us</h2>
              <p>
                With over 20 years of experience, our firm is dedicated to
                delivering justice and professional legal services tailored to
                your needs. Our team of experienced attorneys works closely with
                clients to provide personalized legal counsel and strategic
                representation.
              </p>
              <p>
                We take pride in our commitment to integrity, professionalism,
                and achieving results that matter. Our firm has served hundreds
                of satisfied clients, and we continue to expand our services
                across various domains of law.
              </p>
            </div>

            <div className="App">
              <FeatureSlider />
            </div>
          </div>
        </section>

        <section className="advocate-list" id="high-rated-lawyers1">
          <h1 style={{ textAlign: "center" }} id="advocate-list">
            High Rating Lawyers!
          </h1>
          {ratingLawers.map((lawyer) => (
            <div
              key={lawyer._id}
              className="advocate-card"
              style={{ width: "32%", cursor: "pointer" }}
              onClick={() => { navigate(`/profile/${lawyer._id}`) }}
            >
              {/* LEFT SIDE */}
              <div className="lawyer-info-left">
                <div className="avatar-section">
                  <div className="avatar-circle">
                    {lawyer.image ? (
                      <img
                        src={lawyer.image}
                        alt="Avatar"
                        className="lawyer-avatar-img"
                      />
                    ) : (
                      <span>{lawyer.username?.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="under-avatar">
                    <p className="rating">
                      {lawyer.averageRating?.toFixed(1) || "N/A"}{" "}
                      <span className="reviews">
                        ({lawyer.ratings?.length || 0} reviews)
                      </span>
                    </p>
                    <div className="location">{lawyer.address}, Pakistan</div>
                  </div>
                </div>

                <div className="lawyer-details">
                  <h3>{lawyer.username}</h3>
                  <p className="role">
                    {lawyer.qualification || "Experienced Legal Professional"}
                  </p>

                  <div className="tags">
                    <span className="tag" >
                      {lawyer.specializedIn ? lawyer.specializedIn.map((item, idx) => {
                        return <span onClick={() => { deleteCaseType(item) }} key={idx} style={{ padding: "3px 8px", borderRadius:"12px"}}>{item}<br/></span>
                      }) : "Legal Professional"
                      }
                    </span>
                  </div>

                  <p>Email: {lawyer.email}</p>
                  <p>Phone: {lawyer.phone ? lawyer.phone : "N/A"}</p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div
                className="consultation-box"
                style={{ backgroundColor: "white" }}
              >
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      lawyer.status === "available" ? "available" : "inactive"
                    }
                  >
                    {lawyer.status || "Available"}
                  </span>
                </p>
                <p>
                  <strong>Next Available:</strong>{" "}
                  {lawyer.availability || "N/A"}
                </p>
                <p>
                  <strong>Fee:</strong> ${lawyer.fee || "250"}
                </p>
                <p>
                  <strong>Duration:</strong> {lawyer.duration || "60 minutes"}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="testimonials">
          <h2>Client Testimonials</h2>
          <div className="testimonial-row">
            <div className="testimonial">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Sarah A."
              />

              <p>
                "Justice Law Firm guided me through a complex legal situation
                with care and professionalism. Highly recommended!"
              </p>
              <span>- Sarah A.</span>
            </div>
            <div className="testimonial">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John D."
              />
              <p>
                "Their team helped our business navigate a major legal
                challenge. Exceptional service and results."
              </p>
              <span>- John D.</span>
            </div>
            <div className="testimonial">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Maria G."
              />
              <p>
                "I was nervous about my immigration case, but they handled
                everything smoothly and got me approved."
              </p>
              <span>- Maria G.</span>
            </div>
          </div>
        </section>

        <Footer />
        <div className="btmfooter">
          <p>&copy; 2025 Justice Law Firm. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Home;
