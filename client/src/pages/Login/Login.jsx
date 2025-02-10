import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(responce.data);
      localStorage.setItem("token", responce.data.token);
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-card">
          <div className="form-title">Welcome Back</div>
          <form className="login-form" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <input className="login-button" type="button" value="Login" /> */}
            <button className="login-button" type="submit">
              Login
            </button>
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
