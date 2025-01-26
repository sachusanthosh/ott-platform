import {
  FaHistory,
  FaRegBookmark,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom"; // React Router for navigation
import "./UserProfile.css";

const UserProfileMenu = () => {
  return (
    <div className="shadow-lg rounded-lg user-profile-card">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-200 user-profile-header">
        <div className="flex items-center gap-4 user-head">
          <FaUserCircle size={70} className="avatar" />
          <div className="user-info">
            <h2 className="username">Your name</h2>
            <p className="user-email">yourname@gmail.com</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Card Content */}
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
          <Link to="/" className="user-nav-item logout">
            <div className="user-nav-item-content">
              <FaSignOutAlt className="icon" />
              <span className="nav-text">Log Out</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default UserProfileMenu;
