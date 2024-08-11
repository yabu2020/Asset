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
    <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Security Question</h2>
      <p className="text-lg text-gray-500 mb-6">
        <strong>Your Current Security Question is:</strong> {securityQuestion}
      </p>

      <form onSubmit={handleUpdateSecurityQuestion} className="space-y-6">
        <div>
          <label htmlFor="newSecurityQuestion" className="block text-lg font-medium text-gray-500 mb-2">
            <strong>Set Your New Security Question</strong>
          </label>
          <select
            id="newSecurityQuestion"
            value={newSecurityQuestion}
            onChange={(e) => setNewSecurityQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="" disabled>Select a question</option>
            {predefinedQuestions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="newSecurityAnswer" className="block text-lg font-medium text-gray-500 mb-2">
            <strong>Your New Security Answer</strong>
          </label>
          <input
            type="text"
            id="newSecurityAnswer"
            placeholder="Enter your new security answer"
            value={newSecurityAnswer}
            onChange={(e) => setNewSecurityAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        <button
          type="submit"
          className="w-1/2 py-3 ml-40 px-4 bg-green-400 text-white font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
