import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../api/authApi";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
  const token = localStorage.getItem("resetToken");

  const res = await updatePassword(token, password);

  if (res.message === "Password updated successfully") {
    alert("Password reset successful");
    localStorage.removeItem("resetToken");
    setTimeout(() => {
        navigate("/");
      }, 3000);
  } else {
    alert(res.message);
  }
};


  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={handleReset}>Update Password</button>
      </div>
    </div>
  );
}
