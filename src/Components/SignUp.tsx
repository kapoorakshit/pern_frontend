import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../App.css';
import { signup } from '../apiService/apiService';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signup(values.firstName, values.lastName, values.email, values.password);
        if (response.message === "User created successfully") {
          // Redirect to login page after successful signup
          navigate('/login');
        }
      } catch (error) {
        console.error('Signup error:', error);
      }
    },
  });

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error-message">{formik.errors.firstName}</div>
          )}
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error-message">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
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
              name="password"
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
          <button type="submit">Signup</button>
        </div>
      </form>

      {/* Add a link to login if the user already has an account */}
      <div className="already-user">
        <span>Already a user? </span>
        <Link to="/login" className="login-link">Login here</Link>
      </div>
    </div>
  );
};

export default Signup;
