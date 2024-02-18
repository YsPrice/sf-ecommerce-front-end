import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUp.css';
import {useDispatch} from 'react-redux';

import { registerUserApi } from '../api/services/userServices';
export const SignUpPage = ({ onSignUp }) => {
  const [user, setUserData] = useState({
    email: '',
    password: '',
    name:''

  });

const navigate = useNavigate();
const [error,setError] = useState({})
const [errorMessage,setErrorMessage] = useState('')
  const handleChange = (e) => {
    setUserData({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  try{
    const response = await registerUserApi(user)
    console.log(response)
 navigate('/sign-in')
  } catch(error){
    setError(error.response.status)
 
  
  
  }
  };
  if(error === 401 || error === 422){
    setError('Something went wrong! Sign up unsuccessful')
    setErrorMessage('Something went wrong! Sign up unsuccessful')
   
  }
console.log(errorMessage)
  return (

    <div className="sign-up-page">
    {errorMessage  && <p className="error-message">{errorMessage}</p>}
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already signed up?
      </p>
      <button>
        <Link style={{textDecoration:'none', color:'white'}} to="/sign-in">Sign in</Link></button>
    </div>

  );
};

export default SignUpPage;
