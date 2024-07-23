import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your CSS file

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const [termsAgreed, setTermsAgreed] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setNameError("");
        setEmailError("");
        setPasswordError("");

        if (!name) {
            setNameError("Name is required");
            return;
        } else if (!email) {
            setEmailError("Email is required");
            return;
        } else if (!emailRegex.test(email)) {
            setEmailError("Invalid email format");
            return;
        } else if (!password) {
            setPasswordError("Password is required");
            return;
        } else if (password.length < 8) {
            setPasswordError("Password should be at least 8 characters long");
            return;
        } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setPasswordError("Password should contain both letters and numbers");
            return;
        } else {
            axios
                .post("http://localhost:3001/register", { name, email, password })
                .then((result) => {
                    console.log(result);
                    navigate("/Login");
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="signup-container">
                <h2>Create An Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <div className="text-danger">{nameError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="text-danger">{passwordError}</div>}
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="termsAgreement"
                            onChange={(e) => setTermsAgreed(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="termsAgreement">
                            I agree to the <Link to="/terms">Terms of Use</Link>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
                </form>
                Already have an account?
                <Link to="/Login">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
