import "./Signup.css";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div>
      <div className="signup-container">
        <div className="signup-card">
          <div className="form-title">Create Your Account</div>
          <form className="signup-form" action="post">
            <div className="inpup-groups">
              <label className="signup-labels" htmlFor="name-input">
                Enter your name
              </label>
              <input
                className="signup-input"
                type="text"
                name="name"
                id="name-input"
                placeholder="Name"
              />
            </div>
            <div className="inpup-groups">
              <label className="signup-labels" htmlFor="email-input">
                Enter email
              </label>
              <input
                className="signup-input"
                type="email"
                name="email"
                id="email-input"
              />
            </div>
            <div className="inpup-groups">
              <label className="signup-labels" htmlFor="password-input">
                Enter password
              </label>
              <input
                className="signup-input"
                type="password"
                name="password"
                id="password-input"
              />
            </div>
            <div className="inpup-groups">
              <label className="signup-labels" htmlFor="confirm-password-input">
                Confirm password
              </label>
              <input
                className="signup-input"
                type="confirm-password"
                name="confirm-password"
                id="confirm-password-input"
              />
            </div>

            <input className="signup-button" type="button" value="Sign-up" />
            <hr />
            <div>
              <p className="redirection">
                Already have an account?&nbsp;
                <Link to="/login">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
