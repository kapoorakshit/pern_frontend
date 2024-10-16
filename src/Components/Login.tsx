import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';
import { login } from '../apiService/apiService';
import axios from 'axios'; // Import axios for Google login

const Login: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values.email, values.password);
        if (response.token) {
          localStorage.setItem('token', response.token);
          navigate('/taskboard');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  });

  // Function to handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Redirect to Google login via your backend
      window.location.href = 'http://localhost:3000/auth/google';
      navigate('/taskboard');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">Email {formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">Password {formik.errors.password}</div>
          )}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {/* Google Login Button */}
      <div style={{marginTop: 10}}>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
