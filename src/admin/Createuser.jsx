import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Createuser.css'; // Import the updated CSS file

function Createuser({ setUsers }) {
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState(""); // New state for general form errors

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setFormError(""); // Clear general form error

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
      setPasswordError("Password must be at least 6 characters and include both letters and numbers");
      return;
    }

    axios
      .post("http://localhost:3001/adduser", { role, name, email, password })
      .then((result) => {
        setUsers(prevUsers => [...prevUsers, result.data]);
        alert("User added successfully!");
        setName("");
        setEmail("");
        setPassword("");
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
    <div className="admin-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Create User</h2>
          {formError && <p className="form-error">{formError}</p>} {/* Display general form error */}
          <div className="form-group">
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control ${nameError ? 'error' : ''}`}
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${emailError ? 'error' : ''}`}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${passwordError ? 'error' : ''}`}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="role"><strong>Role</strong></label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
              <option value="user">User</option>
              <option value="Admin">Admin</option>
              <option value="Clerk">Clerk</option>
              <option value="asset approver">Asset Approver</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Add User</button>
        </form>

        <Link to="/admin">Back to Menu</Link>
      </div>
    </div>
  );
}

export default Createuser;
