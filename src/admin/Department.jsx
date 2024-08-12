import React, { useState } from 'react';
import axios from 'axios';

function Department() {
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!code || !description || !department) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Create the payload
    const payload = {
      code,
      description,
      department,
    };

    // Send data to the backend
    axios.post('http://localhost:3001/department', payload)
      .then(response => {
        setMessage('Department registered successfully.');
        setCode('');
        setDescription('');
        setDepartment(''); // Reset category
      })
      .catch(error => {
        setMessage(`Error: ${error.response ? error.response.data.error : error.message}`);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl p-8 rounded-lg shadow-lg" style={{ maxWidth: '500px' }}>
        <h1 className="text-2xl font-bold mb-6 text-center text-green-300">Set Department</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="department" className="block ml-0 font-medium text-gray-600 mb-1">Department Name:</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full px-3 ml-0 bg-gray-100 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label htmlFor="code" className="block font-medium text-gray-600 mb-1">Code:</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-100 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
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
          <div className="w-full ml-20 md:w-1/2 px-3">
            <button
              type="submit"
              className="w-full mt-2 bg-green-300 py-2 px-4 text-black rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register Department
            </button>
          </div>  
          {message && <p className="text-green-400 text-sm mt-4">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Department;
