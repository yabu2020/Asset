import React, { useState, useEffect } from "react";
import axios from "axios";
//import './UserPage.css'; // Import CSS file for styling

function UserPage() {
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch assigned assets for the logged-in user
    axios
      .get("http://localhost:3001/user-assigned-assets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setAssignedAssets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching assigned assets:", error);
        setMessage(
          `Error: ${
            error.response ? error.response.data.error : error.message
          }`
        );
      });
  }, []);

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
                <td>{assignment.dateAssigned}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No assets assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
