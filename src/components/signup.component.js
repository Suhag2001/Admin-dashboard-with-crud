import React, { useState, useEffect, useRef } from "react";
import { faKey, faShield } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mynetwork_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { json, Link } from "react-router-dom";
import SwitchToggle from "./SwitchToggle";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";

const INITIAL_COUNT = 60;
const twoDigits = (num) => String(num).padStart(2, "0");

const Signup = () => {
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  //below code for otp function

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  //   const hoursToDisplay = minutesRemaining - minutesToDisplay;
  // const [otp, setOtp] = useState("");
  // const [username, setUsername] = useState("");

  const handleStart = async () => {
    setStatus(STATUS.STARTED);
    setSecondsRemaining(INITIAL_COUNT);
    otpfunction();
  };
  //below program for send the otp
  const otpfunction = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 1; i < 5; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    console.log(OTP);
    sessionStorage.setItem("otp", OTP);
    // let sendotp = {
    //   username: username,
    //   message: "Your OTP for verification is: " + OTP + ". MyNetwork",
    // };

    // fetch("http://localhost:8090/MynetworkManager/login/sendOtp", sendotp)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.success) {
    //       alert("Send otp successful");
    //     } else {
    //       alert("send otp failed!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error, "something went wrong");
    //   });
  };
  const STATUS = {
    STOPPED: (
      <b>
        <a type="button" onClick={handleStart} link="/" id="otpname">
          Send OTP
        </a>
      </b>
    ),
  };
  const [status, setStatus] = useState(STATUS.STOPPED);
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    //passing null stops the interval
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    //Remember the latest caallback .
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    //Set up the interval
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  //below code for send the data with otp to the database
  const signupAlert = () => {
    alert("Registration Successfull!");
  };

  const submitData = (e) => {
    let dbotp = sessionStorage.getItem("otp");
    if (!username || !otp) {
      alert("All fields are required");
      return;
    }

    console.log(otp);
    if (dbotp === otp) {
      navigate("/all-users");
      signupAlert();
      console.log("OTP verifyed successful!");
    } else {
      console.log("OTP not matched!");
    }
    let sendData = {
      username: username,
      type: "USER",
    };

    fetch("http://localhost:8090/MynetworkManager/user", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfull");
        localStorage.setItem("id", data.id);
        window.alert("id", data.id);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
  };

  const withGoogle = (e) => {
    navigate("/all-users");
    let sendData = {
      username: e,
      type: "USER",
      ssotype: "GOOGLE",
      signuptype: "EMAIL",
    };

    fetch("http://localhost:8090/MynetworkManager/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfull");
        // window.alert("check karlo pehale");
        localStorage.setItem("id", data.id);
        window.alert("id :", data.id);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
    window.location.reload();
  };

  const googleLoginHandler = () => {
    signInWithPopup(auth, provider).then((data) => {
      withGoogle(data.user.email);
      setValue(data.user.email);
      console.log(value);
    });
  };

  return (
    <>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <span className="image_logo">
              <img src={logo} className="avatar" alt="Avatar" />
            </span>
            <div className="google">
              <span className="google_logo">
                <img
                  src={google}
                  onClick={googleLoginHandler}
                  className="avtar_logo"
                  alt="Avatar"
                />
              </span>
              <span className="google_logo">
                <img src={apple} className="avtar_logo" alt="Avatar" />
              </span>
            </div>
            <form style={{ color: "#b9b5b6" }}>
              <h3>Sign Up</h3>

              <div className="mb-3 group_field">
                <FontAwesomeIcon icon={faUser} style={{ padding: "10px" }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email / Mobile no."
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                />
              </div>
              <div className="otp">
                {" "}
                <div>
                  {status === STATUS.STARTED ? (
                    <div>
                      <b id="otp">Resend OTP in </b>
                      <b id="timer">
                        {twoDigits(minutesToDisplay)}:
                        {twoDigits(secondsToDisplay)}
                      </b>
                    </div>
                  ) : (
                    status
                  )}
                </div>
              </div>
              <div className="mb-3 group_field">
                <FontAwesomeIcon icon={faShield} style={{ padding: "10px" }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  name="otp"
                  id="password"
                />
              </div>
              {/* paragraph for the error  */}

              <div className="d-grid">
                <button type="submit" className="button" onClick={submitData}>
                  {/* <Link to="/home-page">Sign Up</Link> */}
                  Sign Up
                </button>
              </div>
              <div className="mb-3 text-account">
                <p className="forgot-password text-right">
                  Already have account <Link to="/sign-in">sign in?</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
