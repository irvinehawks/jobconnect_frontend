
import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', { email, password });
      localStorage.setItem('authToken', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <h1>Signup</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupPage;