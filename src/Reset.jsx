import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reset.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Updated regular expression for password validation
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:;<>,.?~`])[A-Za-z\d!@#$%^&*()_+{}|:;<>,.?~`]{6,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    // Check if all fields are filled
    if (!email || !securityAnswer || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
  
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    // Validate new password
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 6 characters long and include letters, numbers, and special characters.');
      return;
    }
  
    // Proceed with password reset request
    axios
      .post('http://localhost:3001/reset-password', { email, securityAnswer, newPassword })
      .then((response) => {
        if (response.data.success) {
          setMessage('Password has been reset successfully. You will be redirected to the login page.');
          setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } else {
          // Display the detailed error message from the backend
          setError(response.data.message || 'Error resetting password. Please try again.');
        }
      })
      .catch((error) => {
        // Display error details from the response if available
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        setError(errorMessage);
      });
  };
  

  const fetchSecurityQuestion = () => {
    if (email) {
      axios
        .get('http://localhost:3001/security-question', { params: { email } })
        .then((response) => {
          setSecurityQuestion(response.data.securityQuestion || 'Security question not set.');
        })
        .catch((error) => {
          console.error('Error fetching security question:', error);
          setError(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={fetchSecurityQuestion}
          />
        </div>
        {securityQuestion && (
          <>
            <div className="mb-3">
              <label htmlFor="securityAnswer">
                <strong>Answer Security Question</strong>
              </label>
              <input
                type="text"
                placeholder={securityQuestion}
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword">
                <strong>Confirm New Password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}
        <button type="submit">Reset Password</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
