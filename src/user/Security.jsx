import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Security.css';

function SecurityQuestionPage() {
  const { userId } = useParams();
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newSecurityQuestion, setNewSecurityQuestion] = useState('');
  const [newSecurityAnswer, setNewSecurityAnswer] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchSecurityQuestion(userId);
    }
  }, [userId]);

  const fetchSecurityQuestion = (userId) => {
    axios
      .get(`http://localhost:3001/security-question/${userId}`)
      .then((response) => {
        setSecurityQuestion(response.data.securityQuestion || 'Not set');
        setSecurityAnswer(response.data.securityAnswer || '');
      })
      .catch((error) => setUpdateError(`Error: ${error.message}`));
  };

  const handleUpdateSecurityQuestion = (e) => {
    e.preventDefault();
    setUpdateMessage('');
    setUpdateError('');
  
    if (!newSecurityQuestion || !newSecurityAnswer) {
      setUpdateError('Both question and answer are required.');
      return;
    }
  
    axios
      .post('http://localhost:3001/update-security-question', { userId, newSecurityQuestion, newSecurityAnswer })
      .then((response) => {
        if (response.data.success) {
          setUpdateMessage('Security question updated successfully.');
          setSecurityQuestion(newSecurityQuestion);
          setSecurityAnswer(newSecurityAnswer);
          setNewSecurityQuestion('');
          setNewSecurityAnswer('');
        } else {
          setUpdateError('Failed to update security question.');
        }
      })
      .catch((error) => setUpdateError(`Error: ${error.message}`));
  };
  

  return (
    <div className="security-question-page-container">
      <h2>Security Question</h2>
      <p><strong>Current Security Question:</strong> {securityQuestion}</p>

      <form onSubmit={handleUpdateSecurityQuestion}>
        <div className="mb-3">
          <label htmlFor="newSecurityQuestion">
            <strong>New Security Question</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your new security question"
            value={newSecurityQuestion}
            onChange={(e) => setNewSecurityQuestion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newSecurityAnswer">
            <strong>New Security Answer</strong>
          </label>
          <input
            type="text"
            placeholder="Enter your new security answer"
            value={newSecurityAnswer}
            onChange={(e) => setNewSecurityAnswer(e.target.value)}
          />
        </div>
        <button type="submit">Update Security Question</button>
        {updateMessage && <p className="success-message">{updateMessage}</p>}
        {updateError && <p className="error-message">{updateError}</p>}
      </form>
    </div>
  );
}

export default SecurityQuestionPage;