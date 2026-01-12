import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Auth.css";
import { verifyOtp } from "../api/authApi";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp(email, otp);
      console.log("VERIFY OTP RESPONSE:", res);

      // 🔑 GET TOKEN FROM ANY POSSIBLE KEY
      const token =
        res.token ||
        res.resetToken ||
        res.data?.token ||
        res.body?.token;

      if (token) {
        // ✅ SAVE TOKEN
        localStorage.setItem("resetToken", token);

        alert("OTP verified successfully");

        // ✅ MOVE TO RESET PASSWORD PAGE
        navigate("/reset-password");
      } else {
        alert(res.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p>Enter the OTP sent to your email</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
