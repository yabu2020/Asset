import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

function Login({ setCuser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [tooltip, setTooltip] = useState(""); // State for tooltip text
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
              navigate(`/admin/${userData._id}`); // Redirect admin to dashboard
              break;
            case "user":
              navigate(`/userpage/${userData._id}`); // Redirect user to user page 
              break;
            case "Clerk":
              navigate(`/clerk/${userData._id}`); // Redirect clerk to clerk page
              break;
            case "asset approver":
              navigate(`/approver/${userData._id}`); // Redirect asset approver to asset approver page
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
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* Image Container */}
      <div className="w-full bg-gray-300">
        <img 
          src="/login.jpeg" // Replace with the path to your image
          alt="Background" 
          className="w-full h-54 object-cover" // Adjust height as needed
        />
      </div>
      {/* Login Form Container */}
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg -mt-8 relative">
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
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                name="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 pr-12"
                required
              />
              {/* Eye Icon */}
              <div
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={() => setTooltip(showPassword ? "Hide Password" : "Show Password")}
                onMouseLeave={() => setTooltip("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                style={{ height: '100%' }} // Ensure the icon container takes full height
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5 text-gray-500" />
                ) : (
                  <FaEye className="w-5 h-5 text-gray-500" />
                )}
              </div>
              {tooltip && (
                <div className="absolute top-full right-0 mt-1 bg-gray-700 text-white text-xs rounded py-1 px-2">
                  {tooltip}
                </div>
              )}
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="w-32 bg-green-500 text-white py-2 rounded-lg mx-auto block hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4 mb-6"
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
