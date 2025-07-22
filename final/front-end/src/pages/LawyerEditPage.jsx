import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../styles/Profile.css";
import "../styles/UserEditForm.css";
import axios from "axios"
import { toast } from "react-toastify";

const LawyerEditPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        status: "",
        courtdate: "",
        meetings: "",
        hearings: "",

    });
    const [lawyer, setLawyer] = useState(null)
    const { id } = useParams(); // Get the Case ID from the URL parameters
    console.log(id)
    useEffect(() => {
        const getCurrentLawyer = async () => {

            const selectedLawyer = await axios.get(`http://localhost:5000/lawyerEditCases/${id}`);
            console.log(selectedLawyer.data)
            if (selectedLawyer) setFormData(selectedLawyer.data)
            if (selectedLawyer) setLawyer(selectedLawyer.data)
        }
        getCurrentLawyer()
    }, [])
    console.log(lawyer)
    // const selectedLawyer = lawyerData.find(lawyer => lawyer.id === parseInt(id));

    if (!lawyer) {
        return <div>Lawyer not found</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/caseeditput/${id}`, formData);
            toast.success("User updated successfully!");
            navigate(`/activecaselawyer/${lawyer.lawyerId}`)
        } catch (error) {
            toast.error("Update failed:", error);
            alert("Something went wrong!");
        }
    };
    return (
        <div className="lawyer-profile-container">
            <form className="user-form" onSubmit={handleSubmit}>
                <h2>Edit Case Status</h2>

                <label htmlFor="Status">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                    {/* <option value=" ">Status</option> */}
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>

                </select>
                <label htmlFor="courtdate">Court Date</label>
                <input type="date" name="courtdate" value={formData.courtdate} onChange={handleChange} placeholder="Court Date" required />
                <label htmlFor="hearing">Hearing</label>
                <input type="date" name="hearings" value={formData.hearings} onChange={handleChange} placeholder="Hearing Date" required />
                <label htmlFor="meetings">Meetings</label>
                <input type="date" name="meetings" value={formData.meetings} onChange={handleChange} placeholder="Meetings Date and time" required />


                <button type="submit">Save it</button>
            </form>
        </div>
    );
};

export default LawyerEditPage;