import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

function Resetpassword() {
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    const complexityRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!complexityRe.test(password)) {
      return "Password must contain at least one letter and one number";
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
      .post("https://asset-backend-xlfw.onrender.com/resetpassword", {
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
    <div className="flex items-center ml-20 mt-20 justify-center">
      <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg" style={{ width: '60%', marginLeft: "200px", padding: '60px 60px' }}>
        <form onSubmit={handlePasswordReset} className="w-full">
          <h2 className="text-2xl text-center font-bold text-green-400 mb-8">Reset Password</h2>
          <div className="mb-4">
            <label className="block text-gray-500" htmlFor="resetEmail" style={{ display: 'inline-block', width: '30%', marginBottom: '0', verticalAlign: 'middle' }}>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 ${resetEmailError ? 'border-red-500' : ''}`}
              style={{ display: 'inline-block', width: '70%', marginBottom: '5px' }}
            />
            {resetEmailError && <p className="text-red-500 mt-2">{resetEmailError}</p>}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-500" htmlFor="newPassword" style={{ display: 'inline-block', width: '30%', marginBottom: '0', verticalAlign: 'middle' }}>New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 ${passwordError ? 'border-red-500' : ''}`}
              style={{ display: 'inline-block', width: '70%' }}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              title={showNewPassword ? "Hide Password" : "Show Password"}
            >
              {showNewPassword ? <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : <FaEye className="text-gray-500 hover:text-gray-700" />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-500" htmlFor="confirmPassword" style={{ display: 'inline-block', width: '30%', marginBottom: '0', verticalAlign: 'middle' }}>Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200 ${passwordError ? 'border-red-500' : ''}`}
              style={{ display: 'inline-block', width: '70%' }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              title={showConfirmPassword ? "Hide Password" : "Show Password"}
            >
              {showConfirmPassword ? <FaEyeSlash className="text-gray-500 hover:text-gray-700" /> : <FaEye className="text-gray-500 hover:text-gray-700" />}
            </button>
          </div>

          <button type="submit" className="w-1/2 bg-green-400 mt-4 ml-40 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200">Reset Password</button>
          {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          {resetMessage && <p className="text-blue-500 mt-2">{resetMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Resetpassword;
