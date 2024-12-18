import React, { useEffect,useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import NavigationBar from "../Links/NavigationBar";
import './Bookings.css';

const Bookings = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const email = user?.email || null;

  useEffect(() => {
    if (!isAuthenticated || !email) {
      navigate("/login");
    }
  }, [isAuthenticated, email, navigate]);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch("http://localhost:5000/bookings",{
            method : 'POST',
            headers : {
              'Content-Type' : "application/json"
            },
            body : JSON.stringify({checkInDate,checkOutDate,roomType,numGuests,email})
          })

          if(response.ok){
            navigate("/history");
          }
          else{
            alert("something went wrong");
          }
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavigationBar />
          <div className="booking-form-container">
            <h2>Booking Form</h2>
            <form onSubmit={handleSubmit} >
              <div className="form-group">
                <label htmlFor="checkInDate">Check-in Date:</label>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkOutDate">Check-out Date:</label>
                <input
                  type="date"
                  id="checkOutDate"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="roomType">Room Type:</label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                >
                  <option value="">Select Room Type</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="numGuests">Number of Guests:</label>
                <input
                  type="number"
                  id="numGuests"
                  value={numGuests}
                  onChange={(e) => setNumGuests(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <p>Redirecting</p>
      )}
    </div>
  );
};

export default Bookings;
