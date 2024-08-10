import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SecurityQuestionPage() {
  const { userId } = useParams();
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newSecurityQuestion, setNewSecurityQuestion] = useState('');
  const [newSecurityAnswer, setNewSecurityAnswer] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  const predefinedQuestions = [
    'Date of Birth',
    'Favorite Food',
    'Mother’s Maiden Name',
    'First Pet’s Name',
    'High School Name',
    'City of Birth'
  ];

  useEffect(() => {
    if (userId) {
      fetchSecurityQuestion(userId);
    }
  }, [userId]);

  const fetchSecurityQuestion = (userId) => {
    axios
      .get('https://asset-backend-xlfw.onrender.com/security-question', { params: { userId } })
      .then((response) => {
        const { securityQuestion, securityAnswer } = response.data;
        setSecurityQuestion(securityQuestion || 'No current security question');
        setSecurityAnswer(securityAnswer || '');
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
      .post('https://asset-backend-xlfw.onrender.com/update-security-question', { userId, newSecurityQuestion, newSecurityAnswer })
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
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Security Question</h2>
      <p className="text-lg text-gray-600 mb-6">
        <strong>Current Security Question:</strong> {securityQuestion}
      </p>

      <form onSubmit={handleUpdateSecurityQuestion} className="space-y-6">
        <div>
          <label htmlFor="newSecurityQuestion" className="block text-lg font-medium text-gray-700 mb-2">
            <strong>New Security Question</strong>
          </label>
          <select
            id="newSecurityQuestion"
            value={newSecurityQuestion}
            onChange={(e) => setNewSecurityQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>Select a question</option>
            {predefinedQuestions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="newSecurityAnswer" className="block text-lg font-medium text-gray-700 mb-2">
            <strong>New Security Answer</strong>
          </label>
          <input
            type="text"
            id="newSecurityAnswer"
            placeholder="Enter your new security answer"
            value={newSecurityAnswer}
            onChange={(e) => setNewSecurityAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Security Question
        </button>
        {updateMessage && <p className="text-green-600 text-lg">{updateMessage}</p>}
        {updateError && <p className="text-red-600 text-lg">{updateError}</p>}
      </form>
    </div>
  );
}

export default SecurityQuestionPage;
