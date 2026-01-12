import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { login } from "../api/authApi";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await login(email, password);

      if (!data.token) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ ONLY save token
      localStorage.setItem("token", data.token);

      // ✅ App.js will handle notifications
      navigate("/products");

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>

        <input
          type="email"
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

        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="switch">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
