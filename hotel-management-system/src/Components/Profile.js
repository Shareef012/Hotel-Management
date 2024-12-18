import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Links/NavigationBar";
import "./Peofile.css";
import { images } from "../Links/images";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/profile",{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if(response.ok){
        navigate("/dashboard");
      }
      else{
        alert("Error");
      }
    } catch (error) {
      console.log(error);
      
    }
    
    setIsEditing(false);
    navigate('/dashboard');
  };

  const toggleEditMode = () => {
    // console.log(login);
    console.log(user);
    
    
    setIsEditing(!isEditing);
  };

  if (!isAuthenticated) {
    return <p>Redirecting...</p>;
  }

  return (
    <div>
      <NavigationBar />
      {user ? (
        <div className="profile-container">
          <img
            src={
              user.gender === "Male"
                ? images.male
                : user.gender === "Female"
                ? images.female
                : images.default
            }
            alt="Profile"
          />
          <h2>Welcome to {user.name || "N/A"}</h2>

          <div className="profile-details">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="profile-field">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="profile-field">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="">Other</option>
                  </select>
                </div>
                <div className="profile-field">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={toggleEditMode}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="profile-field">
                  <label>Name:</label>
                  <p>{user.name || "N/A"}</p>
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <p>{user.email || "N/A"}</p>
                </div>
                <div className="profile-field">
                  <label>Gender:</label>
                  <p>{user.gender || "N/A"}</p>
                </div>
                <div className="profile-field">
                  <label>Date of Birth:</label>
                  <p>{user.dob ? new Date(user.dob).toISOString().split('T')[0] : "N/A"}</p>
                </div>
                <button onClick={toggleEditMode}>Edit</button>
              </>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
