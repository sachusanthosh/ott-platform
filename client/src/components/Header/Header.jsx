import { Link, useLocation } from "react-router-dom";
import { FaBilibili } from "react-icons/fa6";
import "./Header.css"

const Header = () => {
    const location = useLocation();

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <FaBilibili size={40} className="logo-icon" />
          <span className="navbar-brand">XO</span>
        </div>
        <Link to="/signup" className={`${location.pathname === "/" ? "btn-get-started" : "hidden"}`}>
          Get Started
        </Link>
      </nav>
    </div>
  );
};

export default Header;
