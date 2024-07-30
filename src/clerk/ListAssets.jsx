import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './ListAssets.css'; // Import the CSS file for styling

function ListAssets() {
  const [assets, setAssets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch assets when the component mounts
    axios.get(`http://localhost:3001/assets`)
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  }, []);

  return (
    <div className="assets-container">
      <h2>List of Assets</h2>
      {message && <p className="message">{message}</p>}
      <table className="assets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SerialNo</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? assets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.name}</td>
              <td>{asset.serialno}</td>
              <td>{asset.model}</td>
              <td>{asset.quantity}</td>
              <td>{asset.description}</td>
              <td>{asset.status}</td>
              <td>  
                <Link to={`/updateinfo/${asset._id}`} className="edit-button">Edit</Link>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="4">No assets found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/clerk">Back to Menu</Link>
    </div>
  );
}

export default ListAssets;
