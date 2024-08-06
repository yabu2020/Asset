import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import useParams and Link
import './Userpage.css'; // Import the CSS file for styling

function UserPage() {
  const { userId } = useParams(); // Get userId from route parameters
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userId) {
      fetchAssignedAssets(userId);
    }
  }, [userId]);

  const fetchAssignedAssets = (userId) => {
    console.log('Fetching assets for user ID:', userId);
    axios
      .get(`http://localhost:3001/assigned-assets/${userId}`)
      .then((response) => setAssignedAssets(response.data))
      .catch((error) => setMessage(`Error: ${error.message}`));
  };

  return (
    <div className="user-page-container">
      <h2>Your Assigned Assets</h2>
      {message && <p className="message">{message}</p>}
      <table className="assigned-assets-table">
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset SerialNo</th>
            <th>Date Assigned</th>
          </tr>
        </thead>
        <tbody>
          {assignedAssets.length > 0 ? (
            assignedAssets.map((assignment, index) => (
              <tr key={index}>
                <td>{assignment.asset.name}</td>
                <td>{assignment.asset.serialno}</td>
                <td>{new Date(assignment.dateAssigned).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="link-section">
        <h3>Manage Your Security Question</h3>
        
        <Link to={`/security-question/${userId}`} className="manage-security-question-link">
          Go to Security Question Page
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
