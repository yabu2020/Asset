import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function ResetPassword() {
  const { userId } = useParams();
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

  const predefinedQuestions = [
    'Date of Birth',
    'Favorite Food',
    'Mother’s Maiden Name',
    'First Pet’s Name',
    'High School Name',
    'City of Birth'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Check if all fields are filled
    if (!email || !securityQuestion || !securityAnswer || !newPassword || !confirmPassword) {
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
      .post('http://localhost:3001/reset-password', { email, securityQuestion, securityAnswer, newPassword })
      .then((response) => {
        if (response.data.success) {
          setMessage('Password has been reset successfully. You will be redirected to the login page.');
          setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
        } else {
          setError(response.data.message || 'Error resetting password. Please try again.');
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        setError(errorMessage);
      });
  };

  const fetchSecurityQuestion = () => {
    if (userId) {
      axios
        .get('http://localhost:3001/security-question', { params: { userId } })
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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={fetchSecurityQuestion}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {email && (
          <>
            <div>
              <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-700">Security Question</label>
              <select
                id="securityQuestion"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select a security question</option>
                {predefinedQuestions.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700">Answer Security Question</label>
              <input
                type="text"
                id="securityAnswer"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Reset Password
        </button>
        {message && <p className="text-green-600 font-semibold text-center">{message}</p>}
        {error && <p className="text-red-600 font-semibold text-center">{error}</p>}
      </form>
    </div>
  );
}

export default ResetPassword;
