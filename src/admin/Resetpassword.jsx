import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import resetImage from '../assets/reset.jpg';

function Resetpassword() {
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    const complexityRe = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!complexityRe.test(password)) {
      return "Password must contain at least one letter, one number, and one special character";
    }
    return null;
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    setResetEmailError("");
    setPasswordError("");
    setResetMessage("");

    if (!resetEmail) {
      setResetEmailError("Email is required");
      return;
    }
    if (!validateEmail(resetEmail)) {
      setResetEmailError("Invalid email format");
      return;
    }
    if (!newPassword) {
      setPasswordError("New password is required");
      return;
    }
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/resetpassword", {
        email: resetEmail,
        newPassword,
      })
      .then((response) => {
        setResetMessage(response.data.message);
        setResetEmail("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        console.error(err.response ? err.response.data : err.message);
        setResetMessage("An error occurred while resetting the password.");
      });
  };

  return (
    <div className="flex items-center min-h-screen bg-cover "
    style={{
      backgroundImage: `url(${resetImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

    <div className="flex flex-col items-center p-8"  bg-white bg-cover style={{ maxWidth: "10,000px", marginLeft: "320px" }}>
      <form onSubmit={handlePasswordReset} className="w-full">
        <h2 className="text-2xl text-center font-bold text-white mb-6">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-white" htmlFor="resetEmail">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className={`w-full px-3 py-2 text-white  rounded bg-gray-700 focus:outline-none focus:ring focus:ring-blue-200 ${resetEmailError ? 'border-red-500' : ''}`}
          />
          {resetEmailError && <p className="text-red-500 mt-2">{resetEmailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-white" htmlFor="newPassword">New Password</label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full px-3 py-2 rounded text-white  bg-dark focus:outline-none focus:ring focus:ring-blue-200 ${passwordError ? 'border-red-500' : ''}`}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-2 rounded text-white bg-dark focus:outline-none focus:ring focus:ring-blue-200 ${passwordError ? 'border-red-500' : ''}`}
          />
        </div>
        <button type="submit" className="w-full bg-blue-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200">Reset Password</button>
        {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
        {resetMessage && <p className="text-blue-500 mt-2">{resetMessage}</p>}
      </form>
    </div>
    </div>
  );
}

export default Resetpassword;