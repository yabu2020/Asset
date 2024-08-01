import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListAssets.css'; // Import the CSS file for styling

function ListAssets() {
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null); // Track the currently editing asset
  const [editData, setEditData] = useState({}); // Hold the data of the asset being edited
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch assets when component mounts
    axios.get('http://localhost:3001/assets')
      .then(response => {
        setAssets(response.data);
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  }, []);

  const startEditing = (asset) => {
    setEditingAsset(asset._id);
    setEditData({
      name: asset.name,
      assetno: asset.assetno,
      serialno: asset.serialno,
      model: asset.model,
      quantity: asset.quantity,
      description: asset.description,
      status: asset.status
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({ ...prevData, [name]: value }));
  };

  const saveChanges = (assetId) => {
    axios.put(`http://localhost:3001/updateasset/${assetId}`, editData)
      .then(response => {
        setAssets(assets.map(asset => asset._id === assetId ? response.data : asset));
        setEditingAsset(null);
        setEditData({});
        setMessage('Asset updated successfully');
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  const cancelEditing = () => {
    setEditingAsset(null);
    setEditData({});
  };

  return (
    <div className="assets-container">
      <h2>List of Assets</h2>
      {message && <p className="message">{message}</p>}
      <table className="assets-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Asset Number</th>
            <th>SerialNo</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? assets.map((asset) => (
            <tr key={asset._id}>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.name
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="assetno"
                    value={editData.assetno}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.assetno
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="serialno"
                    value={editData.serialno}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.serialno
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="model"
                    value={editData.model}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.model
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="number"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.quantity
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.description
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <input
                    type="text"
                    name="status"
                    value={editData.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  asset.status
                )}
              </td>
              <td>
                {editingAsset === asset._id ? (
                  <>
                    <button onClick={() => saveChanges(asset._id)} className="save-button">Save</button>
                    <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => startEditing(asset)} className="edit-button">Edit</button>
                )}
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7">No assets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListAssets;
