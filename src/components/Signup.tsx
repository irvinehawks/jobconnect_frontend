import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../api/Api';

type FormValues = {
  email: string;
  password: string;
  role: string;
  companyName?: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const role = watch('role'); // Watch the role field dynamically

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await api.post('/auth/signup', data);
      alert('Sign up successful!');
      console.log('Response:', response.data);
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            {...register('email', { required: true })}
            id="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            {...register('password', { required: true })}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <select
            {...register('role', { required: true })}
            id="role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="JOB_APPLICANT">Job Applicant</option>
          </select>
        </div>
        {role === 'RECRUITER' && (
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-gray-700 font-medium mb-2"
            >
              Company Name
            </label>
            <input
              {...register('companyName')}
              id="companyName"
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already signed up?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;