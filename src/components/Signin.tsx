import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const response = await api.post('/auth/signin', data);
    localStorage.setItem('authToken', response.data.accessToken);
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            placeholder="Email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            {...register('password')}
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border-gray-300"
          />
        </div>
        <div className="text-right mb-4">
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md"
        >
          Sign In
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;