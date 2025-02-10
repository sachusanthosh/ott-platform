import { useState } from "react";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Password changed successfully");
      } else {
        setMessage(data.message || "Error changing password");
      }
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("Error changing password");
    }
  };

  return (
    <div className="change-password-container">
      <h1>Change Password</h1>
      <form className="current-password-form" onSubmit={handleChangePassword}>
        <div className="form-group">
          <label className="password-label" htmlFor="current-password">
            Current Password
          </label>
          <input
            type="password"
            id="current-password"
            className="password-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="password-label" htmlFor="new-password">
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            className="password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="password-label" htmlFor="confirm-password">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            className="password-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="pass-submit" type="submit">
          Change Password
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
