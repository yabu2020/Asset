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
        const userData = result.data[1];
        console.log(userData,'this is the useeda]o ')
        if (result.data[0] === "good") {
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
          alert("Invalid credentials");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleForgotPassword = () => {
    navigate("/reset-password"); // Navigate to the password reset page or modal
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <button type="submit">
            Login
          </button>
        </form>
        <p className="forgot-password-link" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default Login;
