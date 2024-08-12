import React, { useState, useEffect } from 'react';
import axios from 'axios';


function RegisterAsset() {
  const [name, setName] = useState('');
  const [assetno, setAssetno] = useState('');
  const [serialno, setSerialno] = useState('');
  const [model, setModel] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Available'); // Default status
  const [category, setCategory] = useState(''); // Selected category
  const [categories, setCategories] = useState([]); // Categories for dropdown
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    axios.get('https://asset-backend-xlfw.onrender.com/categories')
      .then(response => {
        setCategories(response.data); // Update state with fetched categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setMessage('Error fetching categories.');
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!name || !assetno || !serialno || !model || !quantity || !description || !category) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Create an array of asset instances based on the quantity
    const assetInstances = Array.from({ length: parseInt(quantity, 10) }, (_, index) => ({
      name,
      assetno: `${assetno}-${index + 1}`, // Ensure uniqueness by appending an index
      serialno: `${serialno}-${index + 1}`, // Ensure uniqueness by appending an index
      model,
      description,
      status,
      category, // Add category to asset instances
    }));

    axios.post('https://asset-backend-xlfw.onrender.com/registerassets', assetInstances)
      .then(response => {
        setMessage('Assets registered successfully.');
        setName('');
        setAssetno('');
        setSerialno('');
        setModel('');
        setQuantity('');
        setDescription('');
        setStatus('Available'); // Reset status to default
        setCategory(''); // Reset category
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
      });
  };

  return (
   
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg ml-20 p-8 rounded-lg shadow-lg" style={{ maxWidth: '780px' }}>
          <h1 className="text-2xl font-bold mb-6 text-center text-green-300">Register Asset</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="name" className="block ml-0 font-medium text-gray-600 mb-1">Asset Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 ml-0 bg-gray-100 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="assetno" className="block font-medium text-gray-600 mb-1">Asset Number:</label>
                <input
                  type="text"
                  id="assetno"
                  value={assetno}
                  onChange={(e) => setAssetno(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="serialno" className="block ml-0 font-medium text-gray-600 mb-1">Serial No:</label>
                <input
                  type="text"
                  id="serialno"
                  value={serialno}
                  onChange={(e) => setSerialno(e.target.value)}
                  required
                  className="w-full px-3 py-2 ml-0 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="model" className="block font-medium text-gray-600 mb-1">Model:</label>
                <input
                  type="text"
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="quantity" className="block ml-0 font-medium text-gray-600 mb-1">Quantity:</label>
                <input
                  type="text"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-3 py-2 ml-0 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-700 border-gray-300"
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-3 py-2 border bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300 border-gray-300"
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                   <option key={cat._id} value={cat._id}>
                   {cat.category} (Code: {cat.code})
                 </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block font-medium text-gray-600 mb-1">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>

            <div>
              <label htmlFor="status" className="block font-medium text-gray-600 mb-1">Status:</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-gray-200 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 border-gray-300"
              >
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </div>

            <div className="w-full ml-20 md:w-1/2 px-3">
              <button
                type="submit"
                className="w-full mt-2 bg-green-300 py-2 px-4 text-black rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Register Asset
              </button>
            </div>  
          </form>
        </div>
      </div>
  
  );
}

export default RegisterAsset;
