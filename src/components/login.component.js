import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState, useEffect } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/mynetwork_logo.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SwitchToggle from "./SwitchToggle";
import { useNavigate } from "react-router-dom";
import { auth, provider, provider2 } from "./config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [otpstaus, setOtpstaus] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const submitData = (e) => {
    let dbotp = sessionStorage.getItem("otp");
    if (!username || !otp) {
      alert("All fields are required");
      return;
    }

    console.log(otp);
    if (dbotp === otp) {
      setOtpstaus("YES");
      navigate("/all-users");
      alert("Login successful!");
      console.log("OTP verifyed successful!");
    } else {
      alert("Invalid OTP");
      console.log("OTP not matched!");
    }
    let sendData = {
      username: username,
      type: "USER",
      withOTP: otpstaus,
    };

    fetch("http://localhost:8090/MynetworkManager/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfull and login successfull");
        localStorage.setItem("id", data.id);
        console.log(data.id);
      })
      .catch((eror) => {
        console.log(eror, "something went wrong");
      });
    window.location.reload();
  };

  const withGoogle = (e) => {
    navigate("/all-users");
    let sendData = {
      username: e,
      withOTP: "YES",
    };

    fetch("http://localhost:8090/MynetworkManager/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(sendData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Send data successfully ");
        localStorage.setItem("id", data.id);
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

  const appleLoginHandler = () => {
    signInWithPopup(auth, provider2).then((data) => {
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
                <img
                  src={apple}
                  onClick={appleLoginHandler}
                  className="avtar_logo"
                  alt="Avatar"
                />
              </span>
            </div>

            <form style={{ color: "#b9b5b6" }}>
              <h3>Sign In</h3>
              <div className="mb-3 group_field">
                {/* <label>Email address</label> */}
                <FontAwesomeIcon icon={faUser} style={{ padding: "10px" }} />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email / Mobile Number"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="otp">
                {" "}
                <SwitchToggle />
              </div>

              <div className="mb-3 group_field">
                {/* <label>Password</label> */}
                <FontAwesomeIcon icon={faKey} style={{ padding: "10px" }} />

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter OTP or Password"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="button " onClick={submitData}>
                  Submit
                </button>
              </div>
              <div className="mb-3 text-account">
                <p className="forgot-password text-left">
                  Don’t have any account? <Link to="/sign-up">Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
