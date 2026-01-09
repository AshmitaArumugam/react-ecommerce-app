import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>We’ll send an OTP to your email</p>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendOtp}>Send OTP</button>

        <p className="switch">
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
