import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface RecruiterDashboardProps {
  name: string;
  companyName: string;
  industry: string;
  jobOpenings: number;
  userRole: string;
  profilePictureUrl: string;
}

const RecruiterDashboard: React.FC = () => {
  const [data, setData] = useState<RecruiterDashboardProps | null>(null);

  // Mock object for testing (replace with real API data)
  const mockData: RecruiterDashboardProps = {
    name: 'Irvene Kwambana',
    companyName: 'NetOne',
    industry: 'Telecoms',
    jobOpenings: 5,
    userRole: 'Recruiter',
    profilePictureUrl: 'https://via.placeholder.com/150',
  };

  useEffect(() => {
    const fetchRecruiterData = async () => {
      try {
        const response = await axios.get('/api/recruiter/dashboard'); // Replace with actual endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching recruiter data:', error);
        setData(mockData); // Fallback to mock data
      }
    };

    fetchRecruiterData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center mb-4">
        {/* Profile Picture */}
        <img 
          src={data.profilePictureUrl} 
          alt="Profile" 
          className="w-20 h-20 rounded-full mr-4" 
        />
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-sm text-gray-500">{data.userRole} at {data.companyName}</p>
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold">Dashboard</h3>
        <p><strong>Company:</strong> {data.companyName}</p>
        <p><strong>Industry:</strong> {data.industry}</p>
        <p><strong>Job Openings:</strong> {data.jobOpenings}</p>
      </div>

      {/* Dashboard Links */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Manage Jobs</h3>
        <ul className="list-none p-0">
          <li>
            <a 
              href="/api/recruiter/jobs" 
              className="text-blue-500 hover:underline"
            >
              View Job Openings
            </a>
          </li>
          <li>
            <a 
              href="/api/recruiter/post-job" 
              className="text-blue-500 hover:underline"
            >
              Post a New Job
            </a>
          </li>
          <li>
            <a 
              href="/api/recruiter/edit-job" 
              className="text-blue-500 hover:underline"
            >
              Edit Job Openings
            </a>
          </li>
          <li>
            <a 
              href="/api/recruiter/delete-job" 
              className="text-blue-500 hover:underline"
            >
              Delete Job Openings
            </a>
          </li>
          <li>
            <a 
              href="/api/recruiter/applications" 
              className="text-blue-500 hover:underline"
            >
              View Applications
            </a>
          </li>
        </ul>
      </div>

      {/* Job Posting Section */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Post a Job</h3>
        <textarea 
          placeholder="Write job description here..." 
          className="w-full p-2 border rounded"
        />
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Post Job
        </button>
      </div>
    </div>
  );
};

export default RecruiterDashboard;