import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Auth.css";
import { sendOtp } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Enter email");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Call backend API
      const res = await sendOtp(email);
      console.log("SEND OTP RESPONSE:", res);

      // ✅ OTP is already confirmed by email
      alert("OTP sent to your email");

      // ✅ MOVE TO VERIFY OTP PAGE
      navigate("/verify-otp", { state: { email } });

    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>We’ll send an OTP to your email</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleSendOtp} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </button>

        <p className="switch">
          <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
