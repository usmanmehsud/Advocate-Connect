import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Profile.css";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("userProfile"));

  const [currentStatus, setCurrentStatus] = useState();
  const [lawyer, setLawyer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getCurrentLawyer = async () => {
      try {
        const selectedLawyer = await axios.get(`http://localhost:5000/lawyer/${id}`);
        if (selectedLawyer && selectedLawyer.data.length > 0) {
          setLawyer(selectedLawyer.data[0]);
          setCurrentStatus(selectedLawyer.data[0].status);
        }
      } catch (err) {
        console.error("Error fetching lawyer data:", err);
      }
    };
    getCurrentLawyer();
  }, [id]);

  if (!lawyer) return <div>Lawyer not found</div>;

  const toggleStatus = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/lawyer/status/${id}`);
      Swal.fire("Status Updated", `User is now ${res.data.status}`, "success");
      setCurrentStatus(res.data.status);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  const deleteCaseType= async(item)=>{
    console.log(item)
    try {
      
      const response = await axios.put(`http://localhost:5000/lawyerSpecializedCase/${id}`, {valueToRemove:item});
      console.log(response.data)
      setLawyer(response.data.data)
      swal("Success!", "User updated successfully!", "success");
      // navigate(`/edit-profile/${id}`);

    } catch (error) {
      console.error("Update failed:", error);
      swal("Oops!", "Something went wrong!", "error");
    }
  }

  return (
   <>


    <div className="lawyer-profile">
      <div className="profile-left">
        <img
          src={lawyer.image}
          alt={lawyer.username}
          className="lawyer-profile-image"
        />
      </div>

      <div className="profile-right" style={{ position: "relative" }}>
        {profile._id!=id?"":
        <button
        className="status-button"
        onClick={toggleStatus}
        >
          Status: {currentStatus === "available" ? "Deactivate" : "Available"}
          
        </button>
        }

        <h2>{lawyer.username}</h2>

        <div className="lawyer-info-grid">
          <div><strong>Email:</strong> {lawyer.email}</div>
          <div><strong>Gender:</strong> {lawyer.gender}</div>
          <div><strong>Phone:</strong> {lawyer.phone}</div>
          <div><strong>Age:</strong> {lawyer.age}</div>
          <div><strong>Experience:</strong> {lawyer.experience} years</div>
          <div><strong>Qualification:</strong> {lawyer.qualification}</div>
          <div><strong>Total Cases:</strong> {lawyer.totalCases}</div>
          <div><strong>Specialized in:</strong> {lawyer.specializedIn.map((item, idx)=>{
            return<button disabled={profile._id!=id?true:false} style={{backgroundColor:"goldenrod", padding:"3px", borderRadius:"6px", marginLeft:"3px", cursor:"pointer", fontWeight:"bold"}} 
            onClick={()=>{deleteCaseType(item)}} key={idx}>{item}{profile._id!=id?"":<span>🗑️</span>} </button>
          })}</div>
          <div><strong>Address:</strong> {lawyer.address}</div>
          <div>{lawyer.cnic && <strong>CNIC:</strong>} {lawyer.cnic}</div>
          <div>{lawyer.fee && <strong>Fee: $</strong>} {lawyer.fee}</div>
        </div>

        <p className="bio">{lawyer.biography}</p>

        <div className="button-group">
          <button className="hire-button" onClick={() => navigate('/services')}>View as</button>
          {profile._id!=id?"":
          <button className="hire-button" onClick={() => navigate(`/edit-profile/${lawyer._id}`)}>Edit</button>
          
          }
        </div>

      </div>
    </div>


    <Footer/>
   </>
  );
};

export default Profile;