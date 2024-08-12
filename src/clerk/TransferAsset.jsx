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
    axios.get("https://asset-backend-xlfw.onrender.com/assets")
      .then(response => {
        const assignedAssets = response.data.flatMap(category => category.assets).filter(asset => asset.status === 'Assigned');
        setAssets(assignedAssets);
      })
      .catch(error => setMessage(`Error fetching assets: ${error.message}`));
    
    axios.get("https://asset-backend-xlfw.onrender.com/users")
      .then(response => setUsers(response.data))
      .catch(error => setMessage(`Error fetching users: ${error.message}`));
    
    axios.get("https://asset-backend-xlfw.onrender.com/transfer-history")
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
    <div className="flex">
      <div className="w-1/2 p-6 mb-0 mt-0 ml-80 mr-10 rounded shadow" style={{ maxWidth: '800px', maxHeight: '1000px' }}>
        <h2 className="text-xl font-bold text-green-400 mb-6">Transfer Asset</h2>
        {message && <p className="text-green-400 font-bold mt-2 mb-4">{message}</p>}

        {/* Asset selection */}
        <div className="form-group">
          <label htmlFor="asset-select" className="block font-bold mb-2">Select Asset:</label>
          <select
            id="asset-select"
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="w-full mb-6 p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select an Asset</option>
            {assets.map((asset) => (
              <option key={asset._id} value={asset._id}>
                {asset.assetno} - {asset.serialno} - {asset.name}
              </option>
            ))}
          </select>
        </div>

        {/* From User selection */}
        <div className="form-group">
          <label htmlFor="from-user-select" className="block font-bold mb-2">From User:</label>
          <select
            id="from-user-select"
            value={fromUser}
            onChange={(e) => setFromUser(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          >
            <option value="" disabled>Select a User</option>
            {users.map((user) => (
              <option key={user.email} value={user._id}>
                {user.email} - {user.name} - {user.department}
              </option>
            ))}
          </select>
        </div>

        {/* To User selection */}
        <div className="form-group">
          <label htmlFor="to-user-select" className="block font-bold mb-2">To User:</label>
          <select
            id="to-user-select"
            value={toUser}
            onChange={(e) => setToUser(e.target.value)}
            className="w-full p-2 mb-6 border border-gray-300 rounded"
          >
            <option value="" disabled>Select a User</option>
            {users.map((user) => (
              <option key={user.email} value={user._id}>
                {user.email} - {user.name} - {user.department}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleTransferAsset} className="bg-green-400 hover:bg-green-500 mt-2 mb-2 text-white ml-20 font-bold py-2 px-4 rounded">
          Transfer Asset
        </button>

        {/* Transfer History table */}
        <h1 className="text-xl font-bold mb-4">Transfer History</h1>
        <table className="transfer-history-table">
          <thead>
            <tr className="bg-gray-200 ml-4 mr-6 text-gray-700">
              <th className="px-4 py-2">Asset Name</th>
              <th className="px-4 py-2">Asset Serialno</th>
              <th className="px-4 py-2">From User</th>
              <th className="px-4 py-2">To User</th>
              <th className="px-2 py-2">Transferred Date</th>
            </tr>
          </thead>
          <tbody className="ml-4 mr-4">
            {transferHistory.length > 0 ? (
              transferHistory.map((transfer, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{transfer.asset?.name || "N/A"}</td>
                  <td className="px-4 py-2">{transfer.asset?.serialno || "N/A"}</td>
                  <td className="px-4 py-2">{transfer.fromUser?.name || "N/A"}</td>
                  <td className="px-4 py-2">{transfer.toUser?.name || "N/A"}</td>
                  <td className="px-4 py-2">{new Date(transfer.dateTransfered).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No transfer history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransferAsset;
