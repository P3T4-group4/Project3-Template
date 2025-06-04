// client/src/pages/Signup.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import AuthService from '../utils/auth';
import '../styles/Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ name: '', email: '', password: '' });
  const [addProfile, { error }] = useMutation(ADD_PROFILE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await addProfile({ variables: { ...formState } });
      AuthService.login(data.addProfile.token);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-text">Signup failed: {error.message}</p>}
    </div>
  );
};
export default Signup;
