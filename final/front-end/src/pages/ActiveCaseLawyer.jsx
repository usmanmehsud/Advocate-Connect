import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/activecases.css";
import { isTokenExpired } from "../utility/auth";
import Swal from 'sweetalert2';
import Footer from "./Footer";
const ActiveCaseLawyer = () => {
    const { userId } = useParams();
    const [cases, setCases] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/activecaselawyer/${userId}`
                );
                setCases(response.data);
            } catch (error) {
                console.error("Failed to fetch active cases:", error);
            }
        };

        fetchCases();
    }, [userId]);
    const formatPhoneNumber = (phone) => phone;
    useEffect(() => {
        if (isTokenExpired()) {
            localStorage.clear();
            navigate("/logintype");
        }
    }, []);
    return (
        <div className="active-cases-page">
            <header className="active-cases-header">
                <h1>Active Cases</h1>
                <p>Track and manage your ongoing legal cases efficiently</p>
            </header>
            <main className="cases-container">
                {cases.length > 0 ? (
                    cases.map((item, index) => (
                        <div key={index} className="advocate-card" style={{ width: "32%" }}>
                            <div className="lawyer-info-left">
                                <div className="avatar-section">
                                    <div className="avatar-circle">
                                        {item.image ?
                                            <img style={{ width: "72px", height: "72px" }} src={item.image} alt="" /> :
                                            <span>{item.lawyername?.slice(0, 2).toUpperCase()}</span>
                                        }
                                        {/* <span>{item.lawyername?.slice(0, 2).toUpperCase()}</span> */}
                                    </div>
                                    <div className="under-avatar">
                                        <p className="rating">
                                            {item.averageRating?.toFixed(1) || "N/A"}{" "}
                                            <span className="reviews">
                                                ({item.ratings?.length || 0} reviews)
                                            </span>
                                        </p>
                                        <div className="location">Pakistan</div>
                                    </div>
                                </div>
                                <div className="lawyer-details">
                                    <h3>{item.lawyername}</h3>
                                    <p className="role">Active Case with {item.username}</p>
                                    <p>Email: {item.lawyeremail}</p>
                                    <p>Phone: {formatPhoneNumber(item.lawyerphone)}</p>
                                    <p>User Email: {item.useremail}</p>
                                    <p>User Phone: {item.userphone}</p>

                                    <div className="buttons">
                                        <button
                                            style={{ backgroundColor: "#25eb39" }}
                                            onClick={() =>
                                                window.open(`https://wa.me/${formatPhoneNumber(item.userphone)}`)
                                            }
                                            className="whatsapp-btn"
                                        >
                                            Chat with user on WhatsApp
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="consultation-box" style={{ backgroundColor: "white" }}>
                                <p>
                                    <strong>Status:</strong>
                                    <span className="available">Active</span>
                                </p>
                                <p>
                                    <strong>Next Available:</strong> N/A
                                </p>
                                <p>
                                    <strong>Fee:</strong> N/A
                                </p>
                                <p>
                                    <strong>Duration:</strong> N/A
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No active cases found.</p>
                )}
            </main>
            <header className="active-cases-header bottom-header">
                <h1>Case Progress</h1>
                <p>Track the status updates and milestones</p>
                <div className="active-bottom-container">
                    {cases.length > 0 ? (
                        cases.map((item, index) => (
                            <div key={index} className="advocate-card advocate-card-bottom">
                                <div className="lawyer-info-left">
                                    <div className="lawyer-details">
                                        <h3>{item.lawyername}</h3>
                                        <p className="role">Active Case with {item.username}</p>
                                        <p>Email: {item.lawyeremail}</p>
                                        <p>User Email: {item.useremail}</p>
                                        <div className="buttons">
                                            <button
                                                className="message-btn"
                                                style={{ backgroundColor: "#3be832", color: "black", fontSize: "15px" }}
                                            >
                                                <Link to={`/lawyereditcases/${item._id}`} style={{ textDecoration: "none", color: "black" }}>
                                                    Update Progress
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="consultation-box">
                                    <p>
                                        <strong>Status:</strong>
                                        <span className="available">{item.status}</span>
                                    </p>
                                    <p>
                                        <strong>Court Dates:</strong> {item.courtdate}
                                    </p>
                                    <p>
                                        <strong>Hearing Dates:</strong> {item.hearings}
                                    </p>
                                    <p>
                                        <strong>Meetings with user:</strong> {item.meetings}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No active cases found.</p>
                    )}
                </div>
            </header>
            <div className="new54">
                <Footer />
            </div>
        </div>
    );
};

export default ActiveCaseLawyer;
