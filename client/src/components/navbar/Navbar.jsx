import { Link, useLocation } from "react-router-dom";
import { FaHome, FaRegBookmark, FaUserCircle, FaHistory, FaSearch } from "react-icons/fa";


import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="floating-navbar">
      <div className="navbar-content">
        <Link
          to="/home"
          className={`nav-item ${location.pathname === "/home" ? "active" : ""}`}
        >
          <div className="nav-icon">
            <FaHome />
          </div>
          <span className="nav-label">Home</span>
        </Link>

        <Link
          to="/watch-later"
          className={`nav-item ${location.pathname === "/watch-later" ? "active" : ""}`}
        >
          <div className="nav-icon">
            <FaRegBookmark/>
          </div>
          <span className="nav-label">Watch Later</span>
        </Link>

        <Link
          to="/watch-history"
          className={`nav-item ${location.pathname === "/watch-history" ? "active" : ""}`}
        >
          <div className="nav-icon">
            <FaHistory/>
          </div>
          <span className="nav-label">Watch History</span>
        </Link>

        {/* <Link
          to="/search"
          className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}
        >
          <div className="nav-icon">
            <FaSearch/>
          </div>
          <span className="nav-label">Browse</span>
        </Link> */}

        <Link
          to="/profile"
          className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}
        >
          <div className="nav-icon">
            <FaUserCircle />
          </div>
          <span className="nav-label">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
