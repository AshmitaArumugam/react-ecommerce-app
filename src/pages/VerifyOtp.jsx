import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Auth.css";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerify = () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    navigate("/reset-password");
  };

  if (!email) return null;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to your email</p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
}
