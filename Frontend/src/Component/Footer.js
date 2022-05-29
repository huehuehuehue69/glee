import React from "react";
import "../Css/Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footer_content">
        <img className="logo" src="logo1.png" />
        <h4 className="heading">
          <span>Terms and Condition</span>
          <span>TMBD</span>
          <span>Contact Me</span>
        </h4>

        <img className="git" src="github.svg" />
        <img src="linkedin.svg" />
        <img src="Tmbd.svg" alt="TMBD logo" />
      </div>
    </div>
  );
}

export default Footer;
