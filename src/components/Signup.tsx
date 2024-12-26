import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type SignupFormValues = {
  email: string;
  password: string;
  role: 'RECRUITER' | 'JOB_APPLICANT';
  companyName?: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await axios.post("https://jobconnectbackend-production-5020.up.railway.app/signup", data);
      const token = response.data.token;

      // Store token in localStorage or state
      localStorage.setItem('authToken', token);

      alert('Signup successful! Redirecting to dashboard...');
      
      // Redirect to the correct dashboard based on role
      navigate('/dashboard', { state: { userType: data.role } });
    } catch (error: any) {
      alert(error.response?.data?.message || 'Signup failed, try again !!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        
        <input 
          {...register('email', { required: 'Email is required' })} 
          type="email" 
          placeholder="Email" 
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input 
          {...register('password', { required: 'Password is required', minLength: 6 })} 
          type="password" 
          placeholder="Password" 
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <select 
          {...register('role', { required: 'Role is required' })} 
          className="w-full p-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="RECRUITER">Recruiter</option>
          <option value="JOB_APPLICANT">Job Applicant</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

        {watch('role') === 'RECRUITER' && (
          <input 
            {...register('companyName', { required: 'Company name is required for recruiters' })} 
            type="text" 
            placeholder="Company Name" 
            className="w-full p-2 border rounded"
          />
        )}
        {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;