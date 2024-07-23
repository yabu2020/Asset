import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setCuser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    // Simple form validation
    if (!email) {
      setEmailError("Email is required");
      return;
   
    }
   if (!password) {
      setPasswordError("Password is required");
      return;
    }

    // If all fields are filled, proceed with form submission
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result, "result");
        if (result.data[0] === "good") {
          setCuser(result.data[1]);
          navigate("/home");
        } else {
          navigate("/register");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <center>Welcome Back</center>
        </h2>
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
              className={`form-control rounded-0 ${emailError ? "is-invalid" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className={`form-control rounded-0 ${passwordError ? "is-invalid" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="text-danger">{passwordError}</div>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        Don't have an account?
        <Link to="/register">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
