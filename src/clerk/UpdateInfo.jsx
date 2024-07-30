import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './UpdateInfo.css'; // Import CSS for styling

function UpdateInfo() {
  const { id } = useParams(); // Get asset ID from URL parameters
  const [name, setName] = useState('');
  const [serialno, setSerialno] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available'); // Default status
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch asset data when component mounts
    axios.get(`http://localhost:3001/assets/${id}`)
      .then(response => {
        setName(response.data.name);
        setSerialno(response.data.serialno);
        setModel(response.data.model);
        setQuantity(response.data.quantiy);
        setDescription(response.data.description);
        setStatus(response.data.status);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:3001/updateasset/${id}`, { name, serialno, model, quantity, description, status })
      .then(response => {
        setMessage(`Asset updated successfully: ${response.data.name}`);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  return (
    <div className="update-container">
      <h2>Update Asset Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Serial No</label>
          <input type="text" value={serialno} onChange={(e) => setSerialno(e.target.value)} required />
        </div>
        <div>
          <label>Model</label>
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Available">Available</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="retire">Retired</option>
          </select>
        </div>
        <button type="submit">Update Asset</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Link to="/clerk">Back to Menu</Link>
    </div>
  );
}

export default UpdateInfo;
