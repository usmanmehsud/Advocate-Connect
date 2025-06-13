import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HirePage.css";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utility/auth";
import Footer from "./Footer";
import { toast } from "react-toastify";

const RatingStars = ({ lawyerId }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const submitRating = async (rate) => {
    try {
      setRating(rate);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/rate-lawyer",
        { lawyerId, rating: rate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Rating submitted!");
    } catch (error) {
      setMessage("Failed to submit rating.");
      console.error(error);
    }
  };
  useEffect(() => {
    console.log(isTokenExpired())
    if (isTokenExpired()) {
      localStorage.clear();
      navigate("/logintype");
    }
  }, []);


  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => submitRating(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
            fontSize: "24px",
          }}
          aria-label={`${star} star`}
        >
          ★
        </span>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

const Services = () => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    city: "",
    specializedIn: "",
    experience: "",
  });

  const booklawyerfunciton = async (lawyer_id) => {
    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    try {
      const response = await axios.post(
        `http://localhost:5000/book-lawyer/${loggedInUser._id}`,
        { lawyerId: lawyer_id }
      );
      toast.success("Lawyer Booked Successfully")
      navigate(`/activecasesuser/${loggedInUser._id}`, {
        state: { selectedLawyer: response.data },
      });
    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Booking failed", error);
    }
  };

  const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
  const loggedInUserRole = loggedInUser?.role;
  const loggedInUserId = loggedInUser?._id;

  useEffect(() => {
    const stored = localStorage.getItem("darkMode") === "true";
    setDarkMode(stored);
    document.body.classList.toggle("dark-mode", stored);

    const fetchLawyers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lawyers");

        setLawyers(res.data)
        setFilteredLawyers(res.data)
      } catch (err) {
        console.error("Failed to fetch lawyers", err);
      }
    };


    
    fetchLawyers();
  }, []);

  const formatPhoneNumber = (phone) => {
    return phone?.startsWith("0") ? `+92${phone.slice(1)}` : phone;
  };

  const handleSearch = () => {
    const filtered = lawyers.filter((lawyer) => {
      const nameMatch = filters.name
        ? lawyer.username?.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const cityMatch = filters.city
        ? lawyer.address?.toLowerCase() === filters.city.toLowerCase()
        : true;

      const caseMatch = filters.specializedIn
        ? lawyer.specializedIn === filters.specializedIn
        : true;

      const experienceMatch = filters.experience
        ? Number(lawyer.experience || 0) >= Number(filters.experience)
        : true;

      return nameMatch && cityMatch && caseMatch && experienceMatch;
    });

    setFilteredLawyers(filtered);
  };

  return (
    <div className="hire-page">
      <header className="header">
        <h1 className="djn">Our Advocates</h1>
        <p>Find the best legal experts for your case</p>
      </header>

      {/* Filter Bar */}
      <div className="filter-box" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
        <input
          className="advocate43"
          type="text"
          placeholder="Advocate Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />

        <input
        placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        >
          
        </input>

        <select
          value={filters.specializedIn}
          onChange={(e) => setFilters({ ...filters, specializedIn: e.target.value })}
        >
          <option value="">Case Type</option>
          <option value="Criminal Law">Criminal Law</option>
          <option value="Family Law">Family Law</option>
          <option value="Property Law">Property Law</option>
          <option value="contract law">Contract Law</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Civil Law">Civil Law</option>
          <option value="labor law">Labor / Employment Law</option>
          <option value="intellectual property law">Intellectual Property Law</option>
          <option value="tax law">Tax Law</option>
          <option value="environmental law">Environmental Law</option>
          <option value="immigration law">Immigration Law</option>
          <option value="consumer protection law">Consumer Protection Law</option>
          <option value="personal injury law">Personal Injury Law</option>
          <option value="bankruptcy law">Bankruptcy Law</option>
          <option value="administrative law">Administrative Law</option>
          <option value="human rights law">Human Rights Law</option>
          <option value="international law">International Law</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
        >
          <option value="">Experience</option>
          <option value="1">1 Year</option>
          <option value="2">2 Years</option>
          <option value="3">3 Years</option>
          <option value="5">5+ Years</option>
        </select>

        <button onClick={handleSearch} className="search-btn">
          🔍
        </button>
      </div>

      <section className="advocate-list">
        {filteredLawyers.map((lawyer) => (
          <div key={lawyer._id} className="advocate-card" style={{width:"40%"}}>
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
                        return <span onClick={() => { deleteCaseType(item) }} key={idx} style={{ padding: "3px 8px", borderRadius:"12px"}}>{item}</span>
                      }) : "Legal Professional"
                      }
                    </span>
                  </div>

                <p>Email: {lawyer.email}</p>
                <p>
                  Phone:{" "}
                  {lawyer.phone ? formatPhoneNumber(lawyer.phone) : "N/A"}
                </p>

                {/* Show rating stars only if logged in user is 'user' and not this lawyer */}
                {loggedInUserRole === "user" && loggedInUserId !== lawyer._id && (
                  <RatingStars lawyerId={lawyer._id} />
                )}

                <div className="buttons">
                  {loggedInUserRole === "user" && loggedInUserId !== lawyer._id && (
                    <> <button
                        className="message-btn"
                        style={{ backgroundColor: "#f39c12", color: "white" }}
                        onClick={() => {navigate(`/profile/${lawyer._id}`)}}
                      >
                        View as
                      </button>
                      <button style={{marginBottom:".8rem"}}
                        onClick={() =>
                          window.open(`https://wa.me/${formatPhoneNumber(lawyer.phone)}`)
                        }
                        className="whatsapp-btn"
                      >
                        Chat on WhatsApp
                      </button>

                      
                      <button
                        className="message-btn"
                        style={{ backgroundColor: "blue", color: "white" }}
                        onClick={() => {booklawyerfunciton(lawyer._id)}}
                      >
                        Book now
                      </button>
                    </>
                  )}

                
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="consultation-box" style={{ backgroundColor: "white" }}>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={lawyer.status === "available" ? "available" : "inactive"}
                >
                  {lawyer.status || "Available"}
                </span>
              </p>
              <p>
                <strong>Next Available:</strong> {lawyer.availability || "N/A"}
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
<div className="new0">
      <Footer />
      </div>
      <footer className="footer">
        <p>© 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Services;