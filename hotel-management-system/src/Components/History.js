import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Links/NavigationBar";
import './History.css';

const History = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);

  const email = user?.email || null;

  useEffect(() => {
    if (!isAuthenticated || !email) {
      navigate("/login");
    }
  }, [isAuthenticated, email, navigate]);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/history", { method: "POST", headers: { "Content-Type": "application/json" }, body : JSON.stringify({email}) });
        console.log(response);
        
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          setBookings(data);
          console.log(bookings);
          
        } else {
          console.error("Failed to fetch bookings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);



  useEffect(() => {
    const currentDate = new Date();
    const past = bookings.filter(
      (booking) => new Date(booking.checkOutDate) < currentDate
    );
    const upcoming = bookings.filter(
      (booking) => new Date(booking.checkInDate) >= currentDate
    );

    setPastBookings(past);
    setUpcomingBookings(upcoming);
  }, [bookings]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavigationBar />
          <h1>Booking History</h1>
          <div className="newClass">
              <h3>Past Bookings</h3>
            <div className="pastbookings">
              {pastBookings.length > 0 ? (
                pastBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <strong>Check-in Date:</strong> {booking.checkInDate ? new Date(booking.checkInDate).toISOString().split('T')[0] : "N/A"}
                    <br />
                    <strong>Check-out Date:</strong> {booking.checkOutDate ? new Date(booking.checkOutDate).toISOString().split('T')[0] : "N/A" }
                    <br />
                    <strong>Room Type:</strong> {booking.roomType}
                    <br />
                    <strong>Guests:</strong> {booking.numGuests}
                  </div>
                ))
              ) : (
                <p>No past bookings.</p>
              )}
            </div>
            </div>
            <div>
            <div className="upcomingbookings">
              <h3>Upcoming Bookings</h3>
              {upcomingBookings.length > 0 ? (
                upcomingBookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <strong>Check-in Date:</strong> {booking.checkInDate}
                    <br />
                    <strong>Check-out Date:</strong> {booking.checkOutDate}
                    <br />
                    <strong>Room Type:</strong> {booking.roomType}
                    <br />
                    <strong>Guests:</strong> {booking.numGuests}
                  </div>
                ))
              ) : (
                <p>No upcoming bookings.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default History;
