import React from "react";
import Logo from "../../images/IndusLogo.png";
import Password from "../../images/password-image.gif";
import "../styles/ResetPasswordLink.css";
import { useNavigate } from "react-router-dom";
const ResetPasswordLink = () => {
  const navigate = useNavigate();
  function relogin() {
    navigate("/login");
  }
  return (
    <div className="backgroundimage">
      <div className="password-div ">
        <img
          src={Logo}
          className="img-fluid mx-auto d-block"
          alt="logo"
          id="password-logo-image"
        />
        <div className="card" id="sent-card">
          <img
            src={Password}
            className="img-fluid mx-auto d-block"
            alt="Rest Password Link Sent"
            id="password-image"
          />
          <h1 className="text-center" id="text-pass">
            {" "}
            Kindly Check Your Register Email Id.
          </h1>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button
              type="submit"
              className="btn"
              id="pass-submit-btn"
              onClick={relogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordLink;
