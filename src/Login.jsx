import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'; // Import the updated CSS file


function Login({ setCuser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Basic validation
    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return; // Prevent form submission if there are errors

    axios
    .post("http://localhost:3001", { email, password })
    .then((result) => {
      const response = result.data;
      if (response[0] === "good") {
        const userData = response[1];
        setCuser(userData); // Set current user
        // Redirect based on role
        switch (userData.role) {
          case "Admin":
            navigate("/admin"); // Redirect admin to dashboard
            break;
          case "user":
            navigate("/userpage"); // Redirect user to user page
            break;
          case "Clerk":
            navigate("/clerk"); // Redirect clerk to clerk page
            break;
          case "asset approver":
            navigate("/approver"); // Redirect asset approver to asset approver page
            break;
          default:
            alert("You are not registered");
        }
        } else {
           // Handle error from the backend
           if (response.message === "Incorrect password") {
            setPasswordError("Incorrect password");
          } else if (response.message === "No record found with this email") {
            setEmailError("No record found with this email");
          } else {
            alert("Error occurred during login");
          }
        }
      })
      .catch((err) => {
        if (err.response) {
          // Server responded with a status other than 2xx
          if (err.response.status === 401) {
            setPasswordError("Incorrect password");
          } else if (err.response.status === 404) {
            setEmailError("No record found with this email");
          } else {
            alert("An unexpected error occurred");
          }
        } else {
          // Error occurred in setting up the request
          console.error(err);
          alert("An unexpected error occurred");
        }
      });
  };

  const handleForgotPassword = () => {
    navigate("/reset-password"); // Navigate to the password reset page or modal
  };


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="text-sm text-cyan-600 cursor-pointer" onClick={handleForgotPassword}>
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;