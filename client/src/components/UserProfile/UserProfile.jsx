import { useEffect, useState } from "react";
import { FaHistory, FaRegBookmark, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";

const UserProfileMenu = () => {
  const [user, setUser] = useState({ userName: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="shadow-lg rounded-lg user-profile-card">
      <div className="p-4 border-b border-gray-200 user-profile-header">
        <div className="flex items-center gap-4 user-head">
          <FaUserCircle size={70} className="avatar" />
          <div className="user-info">
            <h2 className="username">{user.userName}</h2>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="p-4 user-profile-content">
        <nav className="user-profile-nav">
          <Link to="/watch-history" className="user-nav-item">
            <div className="user-nav-item-content">
              <FaHistory className="icon" />
              <span className="nav-text">Watch History</span>
            </div>
          </Link>
          <Link to="/watch-later" className="user-nav-item">
            <div className="user-nav-item-content">
              <FaRegBookmark className="icon" />
              <span className="nav-text">Watch Later</span>
            </div>
          </Link>
          <Link to="/change-password" className="user-nav-item">
            <div className="user-nav-item-content">
              <RiLockPasswordLine className="icon" />
              <span className="nav-text">Change Password</span>
            </div>
          </Link>
          <button onClick={handleLogout} className="user-nav-item logout">
            <div className="user-nav-item-content">
              <FaSignOutAlt className="icon" />
              <span className="nav-text">Log Out</span>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default UserProfileMenu;