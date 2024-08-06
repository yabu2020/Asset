import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { NavLink } from 'react-router-dom';
import './TransferAsset.css'; // Import the CSS file for styling

function TransferAsset() {
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [transferHistory, setTransferHistory] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");
  

  useEffect(() => {
    // Fetch assets and users when component mounts
    axios
    .get("http://localhost:3001/assets")
    .then((response) => {
      setAssets(response.data);
    })
    .catch((error) => {
      setMessage(
        `Error: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    });

  axios
    .get("http://localhost:3001/users")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      setMessage(
        `Error: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    });

    // Fetch transfer history
    axios
    .get("http://localhost:3001/transfer-history")
    .then((response) => {
      setTransferHistory(response.data);
    })
    .catch((error) => {
      setMessage(
        `Error: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    });
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
        // Update transfer history table
        setTransferHistory((prev) => [...prev, response.data]);
        // Clear selections
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
    <div className="transfer-asset-container">
      <h2>Transfer Asset</h2>
      {message && <p className="message">{message}</p>}

      <div className="form-group">
        <label htmlFor="asset-select">Select Asset:</label>
        <select
          id="asset-select"
          value={selectedAsset}
          onChange={e => setSelectedAsset(e.target.value)}
        >
          <option value="" disabled>Select an Asset</option>
          {assets.map(asset => (
            <option key={asset._id} value={asset._id}>
              {asset.serialno} - {asset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="from-user-select">From User:</label>
        <select
          id="from-user-select"
          value={fromUser}
          onChange={e => setFromUser(e.target.value)}
        >
          <option value="" disabled>Select a User</option>
          {users.map(user => (
            <option key={user.email} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="to-user-select">To User:</label>
        <select
          id="to-user-select"
          value={toUser}
          onChange={e => setToUser(e.target.value)}
        >
          <option value="" disabled>Select a User</option>
          {users.map(user => (
            <option key={user.email} value={user._id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleTransferAsset} className="transfer-asset-button">
        Transfer Asset
      </button>

      <h3>Transfer History</h3>
      <table className="transfer-history-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset Serialno</th>
            <th>From User Email</th>
            <th>From User Name</th>
            <th>From User department</th>
            <th>To User Email</th>
            <th>To User Name</th>
            <th>To User department</th>
            <th>Date Transferred</th>
          </tr>
        </thead>
        <tbody>
        {/* {
            transferHistory.map((transfer) => {
              console.log(transfer, 'transfer')
            })
          } */}

          {transferHistory.length > 0 ? (
            transferHistory.map((transfer, index) => (
              <tr key={index}>
                <td>{transfer.asset.name}</td>
                <td>{transfer.asset.serialno}</td>
                <td>{transfer.fromUser.email}</td>
                <td>{transfer.fromUser.name}</td>
                <td>{transfer.fromUser.department}</td>
                <td>{transfer.toUser.email}</td>
                <td>{transfer.toUser.name}</td>
                <td >{transfer.toUser.department}</td>
                <td>{transfer.dateTransfered}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No transfer history available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransferAsset;