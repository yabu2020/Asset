import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reset.css'; // Import your CSS for styling

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setErrorMessage("");
    setSuccessMessage("");

    // Basic validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    axios
      .post("http://localhost:3001/reset-password", { email })
      .then((response) => {
        if (response.data.success) {
          setSuccessMessage("Password reset instructions have been sent to your email.");
          setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
        } else {
          setErrorMessage("Error sending password reset instructions. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <button type="submit">
            Send Reset Link
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
