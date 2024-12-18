import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const setLoginData = async() => {
    if (email && password) {

        try {
          const response = await fetch("http://localhost:5000/login",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body : JSON.stringify({email,password})
          })
    
          const result = await response.json();
          console.log(result);
          
          if(response.ok){
             const {email,name,gender,dob} = result;
             login({email,name,gender,dob});
             navigate('/dashboard');
          }
          else{
            alert("email or password is wrong");
          }
        } catch (error) {
          console.log(error);
        }
      
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className='login-container'>
      <label>Enter the Username: </label>
      <input
        type='text'
        placeholder='Enter the Username....'
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <label>Enter the Password: </label>
      <input
        type='password'
        placeholder='Enter the Password....'
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={setLoginData}>Submit</button>
      <p>New Account Registration <Link to="/registration">signup</Link></p>
    </div>
  );
};

export default Login;
