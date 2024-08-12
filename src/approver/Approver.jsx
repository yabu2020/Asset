import React, { useState, useEffect } from "react";
import axios from "axios";

function AssetApprover() {
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAssignedAssets();
  }, []);

  useEffect(() => {
    filterAssets();
  }, [searchQuery, assignedAssets]);

  const fetchAssignedAssets = () => {
    axios
      .get("https://asset-backend-xlfw.onrender.com/assigned-assets")
      .then((response) => {
        setAssignedAssets(response.data);
      })
      .catch((error) => setMessage(`Error fetching assigned assets: ${error.message}`));
  };

  const filterAssets = () => {
    if (!searchQuery) {
      setFilteredAssets(assignedAssets);
      return;
    }
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    const sortedAssets = [...assignedAssets].sort((a, b) => {
      const aMatches = a.user?.email.toLowerCase().includes(lowerCaseQuery);
      const bMatches = b.user?.email.toLowerCase().includes(lowerCaseQuery);
      return aMatches === bMatches ? 0 : aMatches ? -1 : 1;
    });

    setFilteredAssets(sortedAssets);
  };

  const handleApprovalChange = (assignmentId, isChecked) => {
    axios.put(`http://localhost:3001/approve-asset/${assignmentId}`, { Approved: isChecked })
      .then(response => {
        fetchAssignedAssets(); // Refresh the list of assigned assets
        if (isChecked) {
          alert("Successfully approved");
        }
      })
      .catch(error => setMessage(`Error updating approval status: ${error.message}`));
  };
  
  
  return (
    <div className="w-full max-w-5xl ml-60 p-6 rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-400">Assigned Assets</h1>
      </div>

      {message && <p className="text-red-600 text-lg mb-4">{message}</p>}

      <div className="mb-6 flex items-center">
        <label htmlFor="search-bar" className="text-lg font-medium text-gray-500 mr-4">Search User by Email:</label>
        <input
          id="search-bar"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter user email"
          className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-400 mt-10">Assigned Assets</h3>
      <table className="w-full mt-6 border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-green-400">
            <th className="px-4 py-2">Asset Name</th>
            <th className="px-4 py-2">Asset SerialNo</th>
            <th className="px-4 py-2">Assigned To</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Approve</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.length > 0 ? (
            filteredAssets.map((assignment, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">{assignment.asset?.name || "N/A"}</td>
                <td className="px-4 py-2">{assignment.asset?.serialno || "N/A"}</td>
                <td className="px-4 py-2">{assignment.user?.email || "N/A"}</td>
                <td className="px-4 py-2">{assignment.user?.name || "N/A"}</td>
                <td className="px-4 py-2">{assignment.user?.department || "N/A"}</td>
                <td className="px-4 py-2">{assignment.user?.role || "N/A"}</td>
                <td className="px-4 py-2">{new Date(assignment.dateAssigned).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={assignment.status === 'Approved'}
                    onChange={(e) => handleApprovalChange(assignment._id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-2">{assignment.status || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssetApprover;
