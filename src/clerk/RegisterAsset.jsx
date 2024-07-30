import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './RegisterAsset.css'; // Import the CSS file

function RegisterAsset() {
  const [name, setName] = useState('');
  const [serialno, setSerialno] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available'); // Default status
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/registerasset', { name, serialno, model, quantity, description, status })
      .then(response => {
        setMessage(`Asset registered successfully: ${response.data.name}`);
        setName('');
        setSerialno('');
        setModel('');
        setQuantity('');
        setDescription('');
        setStatus('Available'); // Reset status to default
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
      });
  };

  return (
    <div className="register-container">
      <h2>Register Asset</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Asset Name:</label>
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
        <button type="submit">Register Asset</button>
      </form>
      {message && <p className="message">{message}</p>}
      <Link to="/clerk" >Back to Menu</Link>
    </div>
  );
}

export default RegisterAsset;
