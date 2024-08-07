import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function UserPage() {
  const { userId } = useParams();
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userId) {
      fetchAssignedAssets(userId);
    }
  }, [userId]);

  const fetchAssignedAssets = (userId) => {
    axios
      .get(`http://localhost:3001/assigned-assets/${userId}`)
      .then((response) => setAssignedAssets(response.data))
      .catch((error) => setMessage(`Error: ${error.message}`));
  };

  return (
    <div className="p-6 font-sans bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Assigned Assets</h2>
      {message && <p className="text-red-600 text-lg mb-4">{message}</p>}
      
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-gray-700">Asset Name</th>
            <th className="py-3 px-4 text-left text-gray-700">Asset SerialNo</th>
            <th className="py-3 px-4 text-left text-gray-700">Date Assigned</th>
          </tr>
        </thead>
        <tbody>
          {assignedAssets.length > 0 ? (
            assignedAssets.map((assignment, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{assignment.asset?.name || 'N/A'}</td>
                <td className="py-3 px-4 text-gray-700">{assignment.asset?.serialno || 'N/A'}</td>
                <td className="py-3 px-4 text-gray-700">{new Date(assignment.dateAssigned).toLocaleDateString() || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-3 px-4 text-gray-500 text-center">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Your Security Question</h3>
        <p className="text-gray-600 text-sm mb-3">Update your security question to enhance your account security.</p>
        <Link 
          to={`/security-question/${userId}`} 
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 transition duration-200"
        >
          Go to Security Question Page
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
