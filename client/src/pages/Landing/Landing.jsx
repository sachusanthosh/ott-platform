import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <div className="hero">
        <h1 className="hero-title">Welcome to StreamFlix</h1>
        <p className="hero-description">
          Your one-stop destination for unlimited movies, TV shows, and more. Start streaming today!
        </p>
        <div className="hero-buttons">
          <Link to="/login" className="btn-login">
            Log In
          </Link>
          <Link to="/signup" className="btn-signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
