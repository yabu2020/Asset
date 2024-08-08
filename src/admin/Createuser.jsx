import React, { useState } from "react";
import axios from "axios";
import createImage from '../assets/create.jpg';
function Createuser({ setUsers }) {
  const [role, setRole] = useState("user");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState(""); // New state for general form errors

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIdError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setFormError(""); // Clear general form error

    if (!id) {
      setIdError("Id is required");
      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long and include letters, numbers, and special characters");
      return;
    }

    axios
      .post("http://localhost:3001/adduser", { role, id, name, email, password, department })
      .then((result) => {
        setUsers(prevUsers => [...prevUsers, result.data]);
        alert("User added successfully!");
        setId("");
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setFormError(err.response.data.error); // Set general form error
        } else {
          console.log(err);
          setFormError("Error adding user");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: `url(${createImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-md rounded-lg shadow-lg p-8 ">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-600">Create User</h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="block font-bold mb-2 text-gray-600">ID</label>
          <input
            type="text"
            placeholder="Enter Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-1 border-gray-300 ${nameError ? 'border-red-500' : ''}`}
            />
          {idError && <p className="text-red-500 text-sm mt-1">{idError}</p>}
        </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-600" htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-1 border-gray-300 ${nameError ? 'border-red-500' : ''}`}
            />
            {nameError && <p className="text-red-500 mt-2">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-600" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-1 border-gray-300 ${emailError ? 'border-red-500' : ''}`}
            />
            {emailError && <p className="text-red-500 mt-2">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-600" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-2 border-gray-300 ${passwordError ? 'border-red-500' : ''}`}
            />
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          </div>
          <div className="mb-4">
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-1 border-gray-300 ${nameError ? 'border-red-500' : ''}`}
            >
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="IS">IS</option>
            <option value="ES">ES</option>
          </select>
        </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-gray-600" htmlFor="role">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white text-gray-600 focus:outline-none focus:ring focus:ring-green-100 border-2 border-gray-300"
            >
              <option value="user">User</option>
              <option value="Admin">Admin</option>
              <option value="Clerk">Clerk</option>
              <option value="asset approver">Asset Approver</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-300 hover:bg-green-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-200"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createuser;