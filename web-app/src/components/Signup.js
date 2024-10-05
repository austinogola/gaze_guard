import React, { useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios';
import './styles/Signup.css';
import Spinner from './Spinner'

function Signup() {
  const [cookies, setCookie] = useCookies(['gg_token']);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userParam = searchParams.get('bounce')
  console.log(userParam)


  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;
  // const SERVER_HOST='http://213.148.17.135:8000'
  // const SERVER_HOST='https://gazeguard-server-5be665b21a9f.herokuapp.com'
  // const SERVER_HOST='http://127.0.0.1:8000'
  //  const SERVER_HOST='http://localhost:5000'
    const SERVER_HOST='https://server.gazeguard.io'


  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    setApiError('')
    setLoading(true);
    if (validateForm()) {
      try {
        
        const response = await axios.post(`${SERVER_HOST}/auth/signup/`, formData);

        if (response.data.status === 'success') {
          const gg_token=response.data.gg_token
          const date = new Date();
          date.setTime(date.getTime() + (21 * 24 * 60 * 60 * 1000)); // 21 days from now
          setCookie('gg_token',gg_token,{path:'/',expires:date})
          // document.cookie = `access=${response.data.access}; path=/;`;
          if(userParam){
            navigate(`/${userParam}`)
          }else{
            navigate('/');
          }
          
        } else {
          setApiError(response.data.message);
        }
      } catch (error) {
        let errMessage
        if(error.response){
          errMessage=error.response.data.message
        }else{
          errMessage=error.message
        }
        console.log(error);
        
        setApiError(errMessage);
      }
      finally {
        setLoading(false);  // Stop loading
      }
    }else{
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={errors.username ? 'error-input' : ''}
          />
          {errors.username && <p className="error-message">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? 'error-input' : ''}
            />
            <button id='show_hide'
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {apiError && <p className="api-error">{apiError}</p>}
        <button type="submit" className="submit-button">Signup</button>
        <span>Already have an account?<a href='/login'>Login</a></span>
      </form>

      {loading?<Spinner/>:null}
    </div>
  );
}

export default Signup;
