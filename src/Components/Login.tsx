import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';
import { login } from '../apiService/apiService';

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
        // Call the login function from authService

        const response = await login(values.email, values.password);

        if (response.token) { // Adjust based on your response structure
          // Save token to local storage
          localStorage.setItem('token', response.token);
          navigate('/taskboard'); 
        }
      } catch (error) {
        // Handle error
        console.error('Login error:', error);
        // Optionally set an error state to display feedback to the user
      }
    },
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="text"
              name="email" // Ensure the name matches initialValues
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password" // Ensure the name matches initialValues
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
