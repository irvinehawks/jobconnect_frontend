import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecruiterDashboard from '../components/dashboard/RecruiterDashboard';
import ApplicantDashboard from '../components/dashboard/ApplicantDashboard';

type UserType = 'RECRUITER' | 'JOB_APPLICANT';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    // Example: Fetch user type from location state, global state, or API
    const fetchedUserType = location.state?.userType || localStorage.getItem('userType') || null;

    if (fetchedUserType === 'RECRUITER' || fetchedUserType === 'JOB_APPLICANT') {
      setUserType(fetchedUserType as UserType);
    } else {
      // Redirect to login or handle unauthorized access
      navigate('/signin', { replace: true });
    }
  }, [location.state, navigate]);

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="w-3/4">
        {userType === 'RECRUITER' ? <RecruiterDashboard /> : <ApplicantDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;