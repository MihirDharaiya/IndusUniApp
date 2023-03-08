import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../images/IndusLogo.png";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
function ForgotPassword(props) {
  const { forgotPassword } = useUserAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      navigate("/Reset-password-link-sent");
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
          style={{ width: "30rem", height: "30rem" }}
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
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button type="submit" className="btn" id="forgot-submit-btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
