import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faAt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/IndusLogo.png";
import { useUserAuth } from "../../context/UserAuthContext";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { logIn } = useUserAuth();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="backgroundimage">
      <div className="main-div">
        <div
          className="card"
          id="login-card"
          style={{ width: "30rem", height: "35rem" }}
        >
          <img
            src={Logo}
            className="img-fluid mx-auto d-block"
            alt="logo"
            id="login-logo-image"
          />
          <form className="login-form" onSubmit={onSubmit}>
            <div className="input-div mb-3">
              <label className="form-label" id="login-input-title">
                <FontAwesomeIcon icon={faAt} id="login-icon" size="xl" />
                Email ID:
              </label>
              <input
                type="email"
                className="form-control"
                id="login-inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-div mb-3">
              <label className="form-label" id="login-input-title">
                <FontAwesomeIcon icon={faLock} id="login-icon" size="xl" />
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="login-inputField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-pass-div">
              <Link to="/Forgot-password" type="submit" id="forgot-pass-btn">
                Forgot Password ?
              </Link>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="submit"
                className="btn btn-lg "
                id="login-submit-btn"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
