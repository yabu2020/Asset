import React, { useState } from 'react';
import axios from 'axios';

function Viewasset() {
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
      .get(`http://localhost:3001/user-id-by-email/${email}`)
      .then((response) => {
        const { userId } = response.data;
        fetchAssignedAssets(userId);
      })
      .catch((error) => {
        console.error('Error fetching user ID by email:', error);
        setMessage('Error fetching user ID');
        setLoading(false);
      });
  };

  const fetchAssignedAssets = (userId) => {
    axios
      .get(`http://localhost:3001/assigned-assets/${userId}`)
      .then((response) => {
        setAssignedAssets(response.data);
        setMessage('');
      })
      .catch((error) => {
        console.error('Error fetching assigned assets:', error);
        setAssignedAssets([]);
        setMessage(error.response?.data?.error || 'Error fetching assets');
      })
      .finally(() => setLoading(false));
  };
return(
  <div className="max-w-xl mx-auto p-6  rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold mt-2 mb-6 text-gray-400">View Your Assets</h2>
  <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
    <div className="flex items-center space-x-4 w-full max-w-md">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 sm:w-1/2 px-4 py-2 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:ring-green-400 focus:border-green-400 sm:text-sm"
      />
    </div>
    <div className="mb-4 w-full md:w-1/2 ml-40 px-3 ">
    <button
      type="submit"
      className={`px-6 py-2  border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Search'}
    </button>
    </div>
  </form>
      {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold  text-green-400 uppercase tracking-wider">Asset Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Asset SerialNo</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-green-400 uppercase tracking-wider">Date Assigned</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignedAssets.length > 0 ? (
            assignedAssets.map((assignment, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{assignment.asset?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{assignment.asset?.serialno || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(assignment.dateAssigned).toLocaleDateString() || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Viewasset;
