import React, { useState } from 'react';
import axios from 'axios';

function ViewAssets() {
  const [email, setEmail] = useState('');
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Email is required');
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:3001/user-email/${email}`)
      .then((response) => {
        const { userId } = response.data;
        fetchAssignedAssets(userId);
      })
      .catch((error) => {
        console.error('Error fetching user ID by email:', error);
        setMessage(error.response?.data?.error || 'Error fetching user ID');
        setLoading(false);
      });
  };

  const fetchAssignedAssets = (userId) => {
    axios
      .get(`http://localhost:3001/assigned-assets/${userId}`)
      .then((response) => {
        const { data } = response;
        if (data.length === 0) {
          setMessage('No assets assigned to this user');
        } else {
          setAssignedAssets(data);
          setMessage('');
        }
      })
      .catch((error) => {
        console.error('Error fetching assigned assets:', error);
        setAssignedAssets([]);
        setMessage(error.response?.data?.error || 'Error fetching assets');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">View Assigned Assets</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-8">
        <div className="w-full max-w-md">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className={`px-6 py-2 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>
      {message && (
        <p className={`text-center mb-4 ${message.startsWith('Access denied') ? 'text-red-500' : message.startsWith('No') ? 'text-gray-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
      {assignedAssets.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset SerialNo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignedAssets.map((assignment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.asset?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.asset?.serialno || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(assignment.dateAssigned).toLocaleDateString() || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewAssets;
