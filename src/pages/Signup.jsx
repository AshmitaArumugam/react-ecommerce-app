import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { signup } from "../api/authApi";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields required");
      return;
    }

    try {
      const data = await signup(name, email, password);

      if (data.message === "User registered successfully") {
        alert("Signup successful! Please login.");
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Sign Up</button>

        <p className="switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
