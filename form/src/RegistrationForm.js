

import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegistrationForm.css';

// Validation schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required('Full Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', data);
      if (response.data.exists) {
        toast.error('User already exists');
      } else {
        console.log('Form Data:', data);
        toast.success('Registration successful');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred');
    }
  };

  return (
    <div className="registration-form-container">
      <div className="registration-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" {...register('fullName')} className={errors.fullName ? 'error' : ''} />
            <p className="error-message">{errors.fullName?.message}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" {...register('email')} className={errors.email ? 'error' : ''} />
            <p className="error-message">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" {...register('password')} className={errors.password ? 'error' : ''} />
            <p className="error-message">{errors.password?.message}</p>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'error' : ''} />
            <p className="error-message">{errors.confirmPassword?.message}</p>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegistrationForm;
