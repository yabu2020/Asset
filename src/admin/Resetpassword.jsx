import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Resetpassword.css'; // Import the CSS file for styling

function Resetpassword() {
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();

    setResetEmailError("");
    setResetMessage("");

    if (!resetEmail) {
      setResetEmailError("Email is required");
      return;
    }
    if (!validateEmail(resetEmail)) {
      setResetEmailError("Invalid email format");
      return;
    }

    axios
      .post("http://localhost:3001/resetpassword", { email: resetEmail })
      .then((response) => {
        setResetMessage(response.data.message);
        setResetEmail("");
      })
      .catch((err) => {
        console.error(err);
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
        <button type="submit" className="submit-button">Reset Password</button>
        {resetMessage && <p className="success-message">{resetMessage}</p>}
      </form>

     
    </div>
  );
}

export default Resetpassword;
