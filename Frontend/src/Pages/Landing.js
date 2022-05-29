import React, { useState } from "react";
import SignInScreen from "./SignInScreen";
import "../Css/Landing.css";

function Landing() {
  const [signIn, setSignIn] = useState(false);
  
  const handleSignIn = (e) => {
    e.preventDefault();
  };

  return (
    <div className="landingScreen">
      <div className="landingScreen_background">
        <img className="landingScreen_logo" src="./logo1.png" alt="" />

        <div className="landingScreen_gradient"></div>
        <div className="landingScreen_body">
          {signIn ? (
            <SignInScreen />
          ) : (
            <>
              <div className="landingScreen_input">
                <h1> Explore movies, TV shows & more.  </h1>
                <h2> Personal recommendations just   for you.</h2>
                <h3>Ready for a tour?</h3>
                <form onSubmit={handleSignIn}>
                  <button
                    id="submit"
                    onClick={() => setSignIn(true)}
                    className="landingScreen_getStarted"
                    >
                    Get Started
                  </button>
                </form>
              </div>

              <div className="bottom_logo"> 
                <div className="K">
                  <div className="bottom1">
                  <img  src="5K+.svg"/>
                  <h3>Movies Choices</h3>
                  </div>
                  <div className="bottom2">
                  <img  src="film.svg"/>
                  <h3>Best Movies</h3>
                  </div>
                  <div className="bottom3">
                  <img  src="badge1.svg"/>
                  <h3>Personal Recommendation</h3>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
