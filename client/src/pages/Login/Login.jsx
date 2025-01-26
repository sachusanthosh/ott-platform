import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="login-container">
        <div className="login-card">
          <div className="form-title">Welcome Back</div>
          <form className="login-form" action="post">
            <div className="input-groups">
              <label className="login-labels" htmlFor="email-input">
                Enter email
              </label>
              <input
                className="login-input"
                type="email"
                name="email"
                id="email-input"
                placeholder="Email"
              />
            </div>
            <div className="input-groups">
              <label className="login-labels" htmlFor="password-input">
                Enter password
              </label>
              <input
                className="login-input"
                type="password"
                name="password"
                id="password-input"
                placeholder="Password"
              />
            </div>

            <input className="login-button" type="button" value="Login" />
            <hr />
            <div>
              <p className="redirection">
                Don&apos;t have an account?&nbsp;
                <Link to="/signup">Signup here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
