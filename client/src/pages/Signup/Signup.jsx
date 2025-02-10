import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  // const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          userName: name,
          email: email,
          password: pass,
          confirmPassword: confirmPass,
        }
      );
      console.log(responce);
      navigate("/login")
    } catch (error) {
      console.error(error.response.data);
      alert(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <div className="signup-container">
        <div className="signup-card">
          <div className="form-title">Create Your Account</div>
          <form className="signup-form" onSubmit={handleSubmit}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="inpup-groups">
              <label className="signup-labels" htmlFor="confirm-password-input">
                Confirm password
              </label>
              <input
                className="signup-input"
                type="password"
                name="confirm-password"
                id="confirm-password-input"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </div>

            <button className="signup-button" type="submit">
              Sign-up
            </button>
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
