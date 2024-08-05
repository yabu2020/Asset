import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function RegisterAsset() {
  const [assetid, setAssetid] = useState('');
  const [name, setName] = useState('');
  const [assetno, setAssetno] = useState('');
  const [serialno, setSerialno] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available'); // Default status
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/registerasset', { assetid, name, assetno, serialno, model, quantity, description, status })
      .then(response => {
        setMessage(`Asset registered successfully: ${response.data.name}`);
        setAssetid('');
        setName('');
        setAssetno('');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register Asset</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="assetid" className="block text-sm font-medium text-gray-700 mb-1">Asset ID:</label>
            <input
              type="text"
              id="assetid"
              value={assetid}
              onChange={(e) => setAssetid(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Asset Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="assetno" className="block text-sm font-medium text-gray-700 mb-1">Asset Number:</label>
            <input
              type="text"
              id="assetno"
              value={assetno}
              onChange={(e) => setAssetno(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="serialno" className="block text-sm font-medium text-gray-700 mb-1">Serial No:</label>
            <input
              type="text"
              id="serialno"
              value={serialno}
              onChange={(e) => setSerialno(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">Model:</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            >
              <option value="Available">Available</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register Asset
          </button>

          {message && <p className="text-gray-800 text-sm mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default RegisterAsset;
