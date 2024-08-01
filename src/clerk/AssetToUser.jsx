import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './AssetToUser.css'; // Import the CSS file for styling

function AssetToUser() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch assets and users when component mounts
    axios.get('http://localhost:3001/assets')
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });

    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });

    axios.get('http://localhost:3001/assigned-assets')
      .then(response => {
        setAssignedAssets(response.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  }, []);

  const handleGiveAsset = () => {
    if (!selectedAsset || !selectedUser) {
      setMessage('Please select an asset and a user.');
      return;
    }

    axios.post('http://localhost:3001/giveasset', { assetId: selectedAsset, userEmail: selectedUser })
      .then(response => {
        setMessage('Asset given to user successfully');
        // Update assigned assets table
        setAssignedAssets(prev => [...prev, response.data]);
        // Clear selections
        setSelectedAsset('');
        setSelectedUser('');
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

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
            <option key={asset._id} value={asset._id}>
              {asset.serialno} - {asset.name}
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
            <option key={user.email} value={user.email}>
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
          </tr>
        </thead>
        <tbody>
          {assignedAssets.length > 0 ? assignedAssets.map((assignment, index) => (
            <tr key={index}>
              <td>{assignment.asset.name}</td>
              <td>{assignment.asset.serialno}</td>
              <td>{assignment.user.email}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>

      <p>
        <Link to="/">Sign Out</Link>
      </p>
    </div>
  );
}

export default AssetToUser;
