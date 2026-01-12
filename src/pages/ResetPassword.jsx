import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../api/authApi";
import "../Auth.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 BLOCK ACCESS IF NO TOKEN
  useEffect(() => {
    const token = localStorage.getItem("resetToken");
    if (!token) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleReset = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    const token = localStorage.getItem("resetToken");
    if (!token) {
      alert("Unauthorized access");
      navigate("/forgot-password");
      return;
    }

    try {
      setLoading(true);

      const res = await updatePassword(token, password);
      console.log("RESET PASSWORD RESPONSE:", res);

      // ✅ PASSWORD RESET SUCCESS (backend already did it)
      alert("Password reset successful");

      // 🧹 CLEAN TOKEN
      localStorage.removeItem("resetToken");

      // ✅ MOVE TO LOGIN PAGE
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleReset} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}
