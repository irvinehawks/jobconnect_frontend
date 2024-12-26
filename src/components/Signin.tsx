import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post("https://jobconnectbackend-production-5020.up.railway.app/signin", data);
      const { token, userType } = response.data;

      // Store token and userType in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userType', userType);

      alert('Login successful! Redirecting to dashboard...');
      
      // Navigate to the appropriate dashboard
      navigate('/dashboard', { state: { userType } });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        <input 
          {...register('email', { required: 'Email is required' })} 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input 
          {...register('password', { required: 'Password is required' })} 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;