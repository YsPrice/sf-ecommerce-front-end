import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignIn.css'
import { setUser, setCart } from '../reducers/userSlice';
import { loginUserApi } from '../api/services/userServices';
export const SignInPage = ({ onSignIn, onNavigateToSignUp }) => {

  const [user, setUserData] = useState({
    email: '',
    password: '',

  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentCartId = useSelector((state) => state.user.cartId);
  const [error, setError] = useState({});
  const [errorMessage,setErrorMessage] = useState('')
  const handleChange = (e) => {
    setUserData({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUserApi(user);

        dispatch(setUser(response.user)); 
        dispatch(setCart(response.cart))
        
        localStorage.setItem('token', response.token); 
        navigate('/');
    } catch (error) {
      setError(error.response.status)
      console.error('Login failed:', error);
    }
  };
  if(error === 401 || error === 422){
    setError('Incorrect Credentials')
    setErrorMessage('Incorrect Credentials! Sign in unsuccessful')
   
  }
console.log(errorMessage)


  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser);
      console.log('currentCart',currentCartId)
      navigate('/');
    }
  }, [currentUser]);
  return (

    <div className="sign-in-page">
          {!currentUser ? (
             <>
      <h1>Sign In</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user?.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
  
      <p>
        Don't have an account? 
      </p>
      <button onClick={onNavigateToSignUp}>

        <Link to="/sign-up">Sign Up</Link></button>
        </>):(<>
                    <Link to="/">Return home</Link>
                      </>
        )}
    </div>
  );
};

export default SignInPage;
