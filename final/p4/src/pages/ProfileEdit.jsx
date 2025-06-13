import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import "../styles/Profile.css";
import "../styles/UserEditForm.css";
import axios from "axios"
import swal from 'sweetalert';
import { toast } from "react-toastify";


const ProfileEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    phone: "",
    age: "",
    cnic: "",
    experience: "",
    qualification: "",
    totalCases: "",
    specializedIn: "",
    address: "",
    fee: ""
  });
  const [lawyer, setLawyer] = useState(null)
  const { id } = useParams(); // Get the lawyer ID from the URL parameters
  useEffect(() => {
    const getCurrentLawyer = async () => {
      const selectedLawyer = await axios.get(`http://localhost:5000/lawyer/${id}`);
      console.log(selectedLawyer.data[0])
      if (selectedLawyer) setFormData(selectedLawyer.data[0])
      if (selectedLawyer) setLawyer(selectedLawyer.data[0])
    }
    getCurrentLawyer()
  }, [])
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
  const handleChangeSpecialized = (e) => {
    console.log(lawyer.specializedIn)
    if((lawyer?.specializedIn).length>2){

      toast.warn("Only 3 allowed delete anyone from profile")

      return
    }
    const { name, value } = e.target;
    
    formData.specializedIn.push(value),
  
     
    console.log(formData)
  };

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/lawyer/${id}`, formData);
      swal({
        title: "Success!",
        text: "User updated successfully!",
        icon: "success",
        button: "OK",
      });
      navigate(`/profile/${id}`)
    } catch (error) {
      console.error("Update failed:", error);
      swal("Oops!", "Something went wrong!", "error");
    }
  };
  return (
    <div className="lawyer-profile-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Edit User</h2>

        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <input
          name="cnic"
          type="text"
          value={formData.cnic}
          onChange={handleChange}
          placeholder="Enter CNIC (Optional)"
        />
        <input name="fee" type="number" value={formData.fee} onChange={handleChange} placeholder="Enter Fee $" required />
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Experience (years)" required />
        <input name="qualification" type="text" value={formData.qualification} onChange={handleChange} placeholder="Higher Qualification" required />
        <input name="totalCases" type="number" value={formData.totalCases} onChange={handleChange} placeholder="Total Cases" required />
        <select name="specializedIn" value={formData.specializedIn[0]} onChange={handleChangeSpecialized} required>
          <option value="criminal law">Criminal Law</option>
          <option value="family law">Family Law</option>
          <option value="property law">Property Law</option>
          <option value="civil law">Civil Law</option>
          <option value="corporate law">Corporate Law</option>
          <option value="labor law">Labor / Employment Law</option>
          <option value="intellectual property law">Intellectual Property Law</option>
          <option value="tax law">Tax Law</option>
          <option value="environmental law">Environmental Law</option>
          <option value="immigration law">Immigration Law</option>
          <option value="consumer protection law">Consumer Protection Law</option>
          <option value="contract law">Contract Law</option>
          <option value="personal injury law">Personal Injury Law</option>
          <option value="bankruptcy law">Bankruptcy Law</option>
          <option value="administrative law">Administrative Law</option>
          <option value="human rights law">Human Rights Law</option>
          <option value="international law">International Law</option>
        </select>
        
        {/* <input name="specializedIn" value={formData.specializedIn} onChange={handleChange} placeholder="Specialized In" /> */}
        <input name="address" value={formData.address} onChange={handleChange} placeholder="Enter Your City" required />

        <button type="submit">Save it</button>
      </form>
    </div>
  );
};

export default ProfileEdit;