import React from "react";
import "../styles/ActiveCasess.css";

// TEMP FIXES
const filteredLawyers = [];

const formatPhoneNumber = (phone) => phone;
const loggedInUserRole = "user";
const loggedInUserId = "123";
// import RatingStars from "../components/RatingStars"; // Uncomment if needed

const ActiveCases = () => {
  return (
    <div className="active-cases-page">
      <header className="active-cases-header">
        <h1>Active Cases</h1>
        <p>Track and manage your ongoing legal cases efficiently</p>
      </header>

      <main className="cases-container">
        {/* Cards will be added here from backend */}
      </main>

      <section className="advocate-list">
        {filteredLawyers.map((lawyer) => (
          <div key={lawyer._id} className="advocate-card">
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
                <p>
                  <span className="case-tag">Criminal Law</span>
                  <span className="case-tag">Family Law</span>
                  <span className="case-tag">Property</span>
                </p>

                <div className="cases">
                  {lawyer.cases?.slice(0, 3).map((c, index) => (
                    <span className="case-tag" key={index}>
                      {c}
                    </span>
                  ))}
                </div>

                <p>Email: {lawyer.email}</p>
                <p>
                  Phone:{" "}
                  {lawyer.phone ? formatPhoneNumber(lawyer.phone) : "N/A"}
                </p>

                {loggedInUserRole === "user" &&
                  loggedInUserId !== lawyer._id && (
                    <p>{/* <RatingStars lawyerId={lawyer._id} /> */}</p>
                  )}

                <div className="buttons">
                  <button
                    onClick={() =>
                      window.open(
                        `https://wa.me/${formatPhoneNumber(lawyer.phone)}`
                      )
                    }
                    className="whatsapp-btn"
                  >
                    Chat on WhatsApp
                  </button>

                  <button
                    className="message-btn"
                    onClick={() => alert("Opening chat...")}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className="consultation-box">
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

      <header className="active-cases-header bottom-header">
        <h1>Case Progress</h1>
        <p>Track the status updates and milestones</p>
      </header>
    </div>
  );
};

export default ActiveCases;
