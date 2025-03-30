import React, { useState } from "react";
import "./Custom.css";
import { Link } from "react-router-dom";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setSuccess("");

    try {
      let messageToSend = {
        "NAME": formData.name,
        "EMAIL": formData.email,
        "PASSWORD": formData.password
      };

      const response = await fetch(`${SERVER_IP}/RegisterUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageToSend),
        mode: 'cors'
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Registration successful!");
        setSuccess("Registration successful!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed!");
        setError(data.message || "Registration failed!");
      }

    } catch (err) {
      console.log(err);
      alert("Network error. Please try again.");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="custom-signup-container">
      <div className="custom-left-panel">
        <h1 className="custom-title">Welcome to Our Platform</h1>
        <p className="custom-description">
          Join us and start your journey today!
        </p>
      </div>
      <div className="custom-right-panel">
        <h2 className="custom-form-title">Sign Up</h2>
        <form className="custom-signup-form" onSubmit={handleSubmit}>
          <label className="custom-label">Name</label>
          <input
            type="text"
            name="name"
            className="custom-input"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="custom-label">Email</label>
          <input
            type="email"
            name="email"
            className="custom-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="custom-label">Password</label>
          <input
            type="password"
            name="password"
            className="custom-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="custom-label">Re-enter Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="custom-input"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <p className="custom-password-info">
            Must be at least 8 characters long.
          </p>

          <button type="submit" className="custom-button">
            Sign Up
          </button>
        </form>
        <p className="custom-terms">
          Already have an account? <Link to="/login">Log in</Link>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
