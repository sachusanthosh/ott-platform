import { useState } from "react";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    // Replace with your change password API endpoint
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await response.json();
    if (data.success) {
      setMessage("Password changed successfully");
    } else {
      setMessage(data.message || "Error changing password");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <form className="current-password-form" onSubmit={handleChangePassword}>
        <div className="form-group">
          <label htmlFor="current-password">Current Password</label>
          <input
            type="password"
            id="current-password"
            className="current-password-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="confirm-password-label" htmlFor="confirm-password">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="pass-submit" type="submit">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;