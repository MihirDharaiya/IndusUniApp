import React from "react";
import Logo from "../../images/IndusLogo.png";
import Password from "../../images/password-image.gif";
import "../styles/ResetPasswordLink.css";
const ResetPasswordLink = () => {
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
            Kindly Check Your Registar Email Id
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordLink;
