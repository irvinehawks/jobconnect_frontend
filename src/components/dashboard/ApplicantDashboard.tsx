import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ApplicantDashboardProps {
  name: string;
  skills: string[];
  education: string;
  resumeUploaded: boolean;
  readyForWork: boolean;
  experience: string[];
}

const ApplicantDashboard: React.FC = () => {
  const [data, setData] = useState<ApplicantDashboardProps | null>(null);

  // Mock object for testing
  const mockData: ApplicantDashboardProps = {
    name: 'Irvene Kwambana',
    skills: ['React', 'Node.js', 'TypeScript'],
    education: 'BSc in Computer Science',
    resumeUploaded: false,
    readyForWork: true,
    experience: ['Frontend Developer - 2 years', 'Backend Developer - 1 year'],
  };

  useEffect(() => {
    const fetchApplicantData = async () => {
      try {
        const response = await axios.get('/api/applicant/dashboard'); // Replace with actual endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching applicant data:', error);
        setData(mockData); // Fallback to mock data
      }
    };

    fetchApplicantData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Applicant Dashboard</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Education:</strong> {data.education}</p>
      <p><strong>Skills:</strong> {data.skills.join(', ')}</p>
      <p><strong>Experience:</strong> {data.experience.join(', ')}</p>
      <p><strong>Ready for Work:</strong> {data.readyForWork ? 'Yes' : 'No'}</p>
      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Upload Resume</h3>
        {data.resumeUploaded ? (
          <p className="text-green-500">Resume uploaded successfully!</p>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Upload Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicantDashboard;