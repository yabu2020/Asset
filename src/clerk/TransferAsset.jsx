import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransferAsset() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch assets, users, and transfer history
    axios.get("http://localhost:3001/assets")
      .then(response => {
        setAssets(response.data.flatMap(category => category.assets));
      })
      .catch(error => setMessage(`Error fetching assets: ${error.message}`));
    
    axios.get("http://localhost:3001/users")
      .then(response => setUsers(response.data))
      .catch(error => setMessage(`Error fetching users: ${error.message}`));
    
    axios.get("http://localhost:3001/transfer-history")
      .then(response => setTransferHistory(response.data))
      .catch(error => setMessage(`Error fetching transfer history: ${error.message}`));
  }, []);

  const handleTransferAsset = () => {
    if (!selectedAsset || !fromUser || !toUser) {
      setMessage("Please select an asset and both users.");
      return;
    }

    axios.post("http://localhost:3001/transferasset", {
      assetId: selectedAsset,
      fromUserId: fromUser,
      toUserId: toUser
    })
    .then(response => {
      setMessage("Asset transferred successfully");
      setTransferHistory(prev => [...prev, response.data]);
      setSelectedAsset("");
      setFromUser("");
      setToUser("");
    })
    .catch(error => {
      const errorMessage = error.response ? error.response.data.error : error.message;
      setMessage(`Error: ${errorMessage}`);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Transfer Asset</h2>
      {message && <p className="text-red-600 font-semibold mb-4">{message}</p>}

      <div className="mb-6">
        <label htmlFor="asset-select" className="block text-lg font-medium text-gray-700 mb-2">Select Asset:</label>
        <select
          id="asset-select"
          value={selectedAsset}
          onChange={e => setSelectedAsset(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select an Asset</option>
          {assets.map(asset => (
            <option key={asset._id} value={asset._id}>
              {asset.assetno} - {asset.serialno} - {asset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="from-user-select" className="block text-lg font-medium text-gray-700 mb-2">From User:</label>
        <select
          id="from-user-select"
          value={fromUser}
          onChange={e => setFromUser(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.email} - {user.name} - {user.department}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="to-user-select" className="block text-lg font-medium text-gray-700 mb-2">To User:</label>
        <select
          id="to-user-select"
          value={toUser}
          onChange={e => setToUser(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a User</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.email} - {user.name} - {user.department}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleTransferAsset}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-500 transition duration-300"
      >
        Transfer Asset
      </button>

      <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-4">Transfer History</h3>
      <table className="w-full mt-6 border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-2">Asset Name</th>
            <th className="px-4 py-2">Asset Serialno</th>
            <th className="px-4 py-2">From User Email</th>
            <th className="px-4 py-2">From User Name</th>
            <th className="px-4 py-2">From User Department</th>
            <th className="px-4 py-2">From User Role</th>
            <th className="px-4 py-2">To User Email</th>
            <th className="px-4 py-2">To User Name</th>
            <th className="px-4 py-2">To User Department</th>
            <th className="px-4 py-2">To User Role</th>
            <th className="px-4 py-2">Date Transferred</th>
          </tr>
        </thead>
        <tbody>
          {transferHistory.length > 0 ? (
            transferHistory.map((transfer, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{transfer.asset?.name || "N/A"}</td>
                <td className="px-4 py-2">{transfer.asset?.serialno || "N/A"}</td>
                <td className="px-4 py-2">{transfer.fromUser?.email || "N/A"}</td>
                <td className="px-4 py-2">{transfer.fromUser?.name || "N/A"}</td>
                <td className="px-4 py-2">{transfer.fromUser?.department || "N/A"}</td>
                <td className="px-4 py-2">{transfer.fromUser?.role || "N/A"}</td>
                <td className="px-4 py-2">{transfer.toUser?.email || "N/A"}</td>
                <td className="px-4 py-2">{transfer.toUser?.name || "N/A"}</td>
                <td className="px-4 py-2">{transfer.toUser?.department || "N/A"}</td>
                <td className="px-4 py-2">{transfer.toUser?.role || "N/A"}</td>
                <td className="px-4 py-2">{new Date(transfer.dateTransfered).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center py-4">No transfer history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransferAsset;
