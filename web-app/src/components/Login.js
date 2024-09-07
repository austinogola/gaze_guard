import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios';
import './styles/Login.css';
import Spinner from './Spinner'

function Login() {
  const [cookies, setCookie] = useCookies(['gg_token']);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const SERVER_HOST= process.env.REACT_APP_SERVER_HOST;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({})
    setApiError('')
    if (validateForm()) {
      try {
        const response = await axios.post(`${SERVER_HOST}/login/'`, formData);
        
        if (response.data.status === 'success') {
          const gg_token=response.data.token
          const date = new Date();
          date.setTime(date.getTime() + (21 * 24 * 60 * 60 * 1000)); // 21 days from now
          setCookie('gg_token',gg_token,{path:'/',expires:date})
          // document.cookie = `access=${response.data.access}; path=/;`;
          navigate('/');
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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
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
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        {apiError && <p className="api-error">{apiError}</p>}
        <button type="submit" className="submit-button">Login</button>
        <span>Don't have an account?<a href='/signup'>Signup</a></span>
      </form>
      {loading?<Spinner/>:null}
    </div>
  );
}

export default Login;
