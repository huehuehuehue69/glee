import React, { useEffect, useState } from "react";
import "../Css/Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

  }, []); 
  return (
    <div className={`nav ${show && "nav_black"} `}>
      <img
        className={`nav_logo ${show && "nav_logo_small"}`}
        src="logo1.png"
        alt="Glee logo"
      />
     
      <img
        className="nav_avatar"
        src="logout.png"
        alt="Log Out" 
        onClick={()=>{
          localStorage.clear();
          window.location.reload();
        }}
      />
    </div>
  );
}

export default Nav;
