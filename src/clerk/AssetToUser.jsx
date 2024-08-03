import React, { useState, useEffect } from "react";
import axios from "axios";
import './AssetToUser.css'; // Import the CSS file for styling

function AssetToUser() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetsResponse, usersResponse, assignedAssetsResponse] = await Promise.all([
          axios.get('http://localhost:3001/assets'),
          axios.get('http://localhost:3001/users'),
          axios.get('http://localhost:3001/assigned-assets')
        ]);

        setAssets(assetsResponse.data);
        setUsers(usersResponse.data);
        setAssignedAssets(assignedAssetsResponse.data);
      } catch (error) {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  const handleGiveAsset = () => {
    if (!selectedAsset || !selectedUser) {
      setMessage('Please select an asset and a user.');
      return;
    }
  
    axios.post('http://localhost:3001/giveasset', { assetId: selectedAsset, userId: selectedUser })
      .then(response => {
        setMessage('Asset given to user successfully');
        setAssignedAssets(prev => [...prev, response.data]);
        setSelectedAsset('');
        setSelectedUser('');
      })
      .catch(error => {
        const errorMsg = error.response ? error.response.data.error : error.message;
        setMessage(`Error: ${errorMsg}`);
      });
  };
  
  console.log(selectedAsset);
  return (
    <div className="asset-to-user-container">
      
      <h2>Assign Asset to User</h2>
      {message && <p className="message">{message}</p>}

      <div className="form-group">
        <label htmlFor="asset-select">Select Asset:</label>
        <select
          id="asset-select"
          value={selectedAsset}
          onChange={(e) => setSelectedAsset(e.target.value)}
        >
          <option value="" disabled>Select an Asset</option>
          {assets.map((asset) => (
            <option key={asset.assetid} value={asset.assetid}>
              {asset.serialno} - {asset.name} (Qty: {asset.quantity})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="user-select">Select User:</label>
        <select
          id="user-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="" disabled>Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleGiveAsset} className="give-asset-button">Give Asset</button>

      <h3>Assigned Assets</h3>
      <table className="assigned-assets-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset SerialNo</th>
            <th>Assigned To</th>
            <th>User Department</th>
            <th>Date Assigned</th>
          </tr>
        </thead>
        <tbody>
          {assignedAssets.length > 0 ? assignedAssets.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.asset.name}</td>
              <td>{assignment.asset.serialno}</td>
              <td>{assignment.user.name}</td>
              <td>{assignment.user.department}</td>
              <td>{new Date(assignment.dateAssigned).toLocaleDateString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssetToUser;
