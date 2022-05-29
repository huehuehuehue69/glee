import React,{useState} from "react";
import "../Css/SignInScreen.css";
import SignUpScreen from "./SignUpScreen";



function SignInScreen() {


  const [signUp, setSignUp] = useState(false);
  
  const signIn = async (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var obj = {
      username: username,
      password: password,
    };
    obj = JSON.stringify(obj);

    console.log(obj, "In Sign In");

    await fetch("https://glee-api.herokuapp.com/user/login", {

      // Adding method type
      method: "post",

      // Adding body or contents to send
      body: obj,

      // Adding headers to the request
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if(!json.token)alert(json.msg)
        else {
          localStorage.setItem('token', json.token)
          window.location.reload();
        }
      });
    
  };
  return (
    <>
    {signUp ? (
      <SignUpScreen />
    ) : (
    <div className="signInScreen">
      
      <form>
        <h1>Sign In</h1>
        <input
          id="username"
          placeholder="Username"
          type="text"
          onChange={(e) => console.log("Username Input")}
        />
        <input
          id="password"
          placeholder="Password"
          type="password"
          onChange={(e) => console.log("Password Input")}
        />
        <button className="Buttsi" type="submit" onClick={signIn}>
          SIGN IN
        </button>
        <div className="terms_condition">
          <input type="checkbox" id="scales" name="scales"/>
          <label>
          I accept the{" "}<a href="Glee_T&C.pdf" target="_blank">
                <span className="CheckBox">Terms and conditions</span></a>
          </label>
        </div>

        <h4>
          <span className="signedInScreen_gray">New to Glee? </span>
          <span className="signInScreen_link" onClick={() => setSignUp(true)}>
            Sign Up Now
          </span>
        </h4>
      </form>
      
    </div>
    )}
    </>
  );
}

export default SignInScreen;
