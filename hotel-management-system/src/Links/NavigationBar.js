import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className='navigation'>
        <Link to="/dashboard" className='nav-link'>Dashboard</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/history">History</Link>
        <Link to="/profile">Profile</Link>
    </div>
  )
}

export default NavigationBar