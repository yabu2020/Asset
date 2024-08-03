import React, { useState } from "react";
import axios from "axios";
import './Resetpassword.css'; // Import the CSS file for styling

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
    // Check password length
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    
    // Check password complexity
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
    <div className="reset-password-container">
      <form onSubmit={handlePasswordReset} className="reset-password-form">
        <h2>Reset Password</h2>
        <div className="form-group">
          <label htmlFor="resetEmail"><strong>Email</strong></label>
          <input
            type="email"
            placeholder="Enter Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            className={`form-control ${resetEmailError ? 'error' : ''}`}
          />
          {resetEmailError && <p className="error-message">{resetEmailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="newPassword"><strong>New Password</strong></label>
          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`form-control ${passwordError ? 'error' : ''}`}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`form-control ${passwordError ? 'error' : ''}`}
          />
        </div>
        <button type="submit" className="submit-button">Reset Password</button>
        {passwordError && <p className="error-message">{passwordError}</p>}
        {resetMessage && <p className="success-message">{resetMessage}</p>}
      </form>
    </div>
  );
}

export default Resetpassword;
