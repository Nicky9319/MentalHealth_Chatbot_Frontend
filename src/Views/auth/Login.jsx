import "./Custom.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Cookies from "js-cookie";

const SERVER_IP = import.meta.env.VITE_APP_BACKEND_URL;;
// const SERVER_IP = "http://127.0.0.1:5000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Login attempt with email:", email);

    try {
      let messageToSend = { EMAIL: email, PASSWORD: password };
      console.log("Sending request to server with payload:", messageToSend);

      const response = await fetch(`${SERVER_IP}/VerifyCredentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageToSend),
        mode: "cors",
      });

      console.log("Received response from server:", response);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok && data.STATUS == "USER_FOUND") {
        const userData = { EMAIL: email };
        console.log("Credentials verified, setting cookies and local storage");
        
        Cookies.remove("USER_DATA");
        Cookies.remove("TEAMS_DATA");

        Cookies.set("USER_DATA", JSON.stringify(userData), { expires: 7 });
        localStorage.setItem("user", JSON.stringify(userData));

        alert("Login successful!");
        window.location.href = "/plan";
      } else {
        console.log("Invalid credentials:", data.message);
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Failed to connect to the server.");
    }

    setLoading(false);
  };

  return (
    <div className="custom-signup-container">
      <div className="custom-left-panel">
        <h1 className="custom-title">Welcome Back!</h1>
        <p className="custom-description">
          Log in to continue your journey with us.
        </p>
      </div>
      <div className="custom-right-panel">
        <h2 className="custom-form-title">Login</h2>
        <form className="custom-signup-form" onSubmit={handleLogin}>
          <label className="custom-label">Email</label>
          <input
            type="email"
            className="custom-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="custom-label">Password</label>
          <input
            type="password"
            className="custom-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="custom-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="custom-error">{error}</p>}
        <p className="custom-terms">
          Don't have an account? <Link to="/signup">Sign Up</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
