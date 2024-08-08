import React, { useState, useEffect } from 'react';
import axios from 'axios';
/*import './ListAssets.css'; // Import the CSS file for styling*/

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
    <div className="grid grid-cols-1 ml-12 lg:grid-cols-1 gap-6 w-screen">
    <div className="bg-white border border-gray-100 shadow-md shadow-black/10 p-6 rounded-md w-full">
        <div className="flex justify-between w-full">
            <div>
                <h1 className="font-semibold bg-gray-50 text-lg">List of Assets</h1>
            </div>
    {message && <p className="text-gray-300 text-md font-medium hover:text-green-500 ml-2">{message}</p>}
     </div>
     <div className="overflow-x-auto">
    <table className="w-full flex-grow min-w-[540px]">
      <thead>
        <tr>
            <th className="text-[15px] uppercase border border-solid tracking-wide font-semibold  text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Name</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Asset Number</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">SerialNo</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Model</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Quantity</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Description</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Status</th>
            <th className="text-[15px] uppercase border border-solid tracking-wide  font-semibold text-green-400 py-2 px-3 bg-gray-50 text-left rounded-bl-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? assets.map((asset) => (
            <tr key={asset._id}>
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
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
              <td className="py-2 px-4 border-b align-middle border-b-gray-50">
                {editingAsset === asset._id ? (
                  <>
                    <button onClick={() => saveChanges(asset._id)} className="hover:bg-gray-500 bg-green-50 text-green-400">Save</button>
                    <button onClick={cancelEditing} className="hover:bg-gray-500 bg-green-50 text-green-400">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => startEditing(asset)} className="hover:bg-gray-500 bg-green-50 text-green-400">Edit</button>
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
      </div>
    </div>
  );
}

export default ListAssets;