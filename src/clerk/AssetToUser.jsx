import React, { useState, useEffect } from "react";
import axios from "axios";
import clerkImage from '../assets/clerk.jpg';

function AssetToUser() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAssets();
    fetchUsers();
    fetchAssignedAssets();
  }, []);

  const fetchAssets = () => {
    axios
      .get("http://localhost:3001/assets")
      .then((response) => {
        // console.log("Fetched assets:", response.data); // Log fetched assets
        setAssets(response.data.flatMap(category => category.assets)); // Flatten the asset array
      })
      .catch((error) => setMessage(`Error fetching assets: ${error.message}`));
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => setMessage(`Error fetching users: ${error.message}`));
  };

  const fetchAssignedAssets = () => {
    axios
      .get("http://localhost:3001/assigned-assets")
      .then((response) => {
        //console.log("Fetched assigned assets:", response.data); // Log fetched assigned assets
        setAssignedAssets(response.data);
      })
      .catch((error) => setMessage(`Error fetching assigned assets: ${error.message}`));
  };

  const handleGiveAsset = () => {
    if (!selectedAsset || !selectedUser) {
      setMessage("Please select an asset and a user.");
      return;
    }

    axios
      .post("http://localhost:3001/giveasset", {
        assetId: selectedAsset,
        userId: selectedUser,
      })
      .then((response) => {
        setMessage("Asset given to user successfully");
        fetchAssignedAssets(); // Refresh the list after assignment
        setSelectedAsset("");
        setSelectedUser("");
      })
      .catch((error) => setMessage(`Error assigning asset: ${error.response?.data?.error || error.message}`));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover"
      style={{
        backgroundImage: `url(${clerkImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl mt-4 font-bold text-gray-400 mb-6">Assign Asset to User</h2>
        {message && <p className="text-green-400 text-lg mb-4">{message}</p>}

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="asset-select" className="block text-lg font-medium text-gray-500 mb-2">Select Asset:</label>
            <select
              id="asset-select"
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
              className="flex-1 w-76 px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="" disabled>Select an Asset</option>
              {assets.map((asset) => (
                <option key={asset._id} value={asset._id}>
                  {asset.assetno} - {asset.serialno} - {asset.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label htmlFor="user-select" className="block text-lg font-medium text-gray-500 mb-2">Select User:</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="" disabled>Select a User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.email} - {user.name} - {user.department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGiveAsset}
          className="px-6 py-3 bg-green-400 ml-80 text-white font-semibold rounded-md shadow-md hover:bg-green-500 transition duration-300"
        >
          Give Asset
        </button>

        <h3 className="text-xl font-semibold text-gray-500 mt-10">Assigned Assets</h3>
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
            </tr>
          </thead>
          <tbody>
            {assignedAssets.length > 0 ? (
              assignedAssets.map((assignment, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{assignment.asset?.name || "N/A"}</td>
                  <td className="px-4 py-2">{assignment.asset?.serialno || "N/A"}</td>
                  <td className="px-4 py-2">{assignment.user?.email || "N/A"}</td>
                  <td className="px-4 py-2">{assignment.user?.name || "N/A"}</td>
                  <td className="px-4 py-2">{assignment.user?.department || "N/A"}</td>
                  <td className="px-4 py-2">{assignment.user?.role || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(assignment.dateAssigned).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No assets assigned</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetToUser;