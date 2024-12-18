import React, { useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Links/NavigationBar';
import { placesInIndia } from '../Links/PlacesInIndia';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavigationBar />
          <div className='places-can-be'>
            <div className='new-row'>
                <div className='items'>
                    <img src='https://promos.makemytrip.com/Hotels_product/Luxe/brands.png' />
                    <p>Luxe Properties in india</p>
                </div >
                <div className='items'>
                    <img src='https://promos.makemytrip.com/altacco_luxe/imgs/luxe_villa.jpg' />
                    <p>Luxe Villas in India</p>
                </div>
                <div className='items'>
                    <img src='https://promos.makemytrip.com/notification/xhdpi/maldives.jpg' />
                    <p>Maldives</p>
                </div>
            </div>
            <div className='places-list'>
              {placesInIndia.map((place, index) => (
                <div key={index} className='place-card'>
                  <img
                    src={place.image}
                    alt={place.cityName}
                    className='place-image'
                  />
                  <h3>{place.cityName}</h3>
                  <h4>The type of bookings:</h4>
                  <ul>
                    {place.hotelTypes.map((hotel, idx) => (
                      <li key={idx}>{hotel}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default Dashboard;
