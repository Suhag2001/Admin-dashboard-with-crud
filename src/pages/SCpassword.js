import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import bcrypt from "bcryptjs";

function SCpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let userid = 8;

  // const saltRounds = 10; // the number of salt rounds to use for the encryption
  // const hashedPassword = bcrypt.hashSync(password, saltRounds);
  // console.log(hashedPassword);
  const handleSubmit = (e) => {
    if (password === confirmPassword) {
      let sendData = {
        id: userid,
        password: password,
      };
      console.log(password);
      fetch("http://localhost:8090/MynetworkManager/login/update", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(sendData),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Password set successfull");
          window.alert("Password set successfully!");
        })
        .catch((eror) => {
          console.log(eror, "something went wrong");
        });
      window.location.reload(true);
    } else {
      window.alert("Password did not match");
    }
  };

  const getInputValue = () => {
    // show the user input value to console
    console.log(password);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="sidebar-distance">
      <nav className="navbar-page">
        <h4>Set Password</h4>
      </nav>
      <div className="main-body-containt">
        <div className="characters">
          <p>
            <sup>*</sup>Your password must be contain at least six characters
            and cannot contain spaces.
          </p>
        </div>
        <div>
          <div className="password-text" htmlFor="password">
            <b> New Password</b>
          </div>
          <div className="both-input-eye">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="password-input"
              autoComplete="off"
              value={password}
              onChange={handlePasswordChange}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? (
                <VisibilityIcon className="eye-icon" />
              ) : (
                <VisibilityOffIcon className="eye-icon" />
              )}
            </span>
          </div>

          <div className="password-text" htmlFor="confirm-password">
            <b>Confirm Password</b>
          </div>
          <div className="both-input-eye">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              autoComplete="off"
              className="password-input"
              onChange={handleConfirmPasswordChange}
            />
            <span onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <VisibilityIcon className="eye-icon" />
              ) : (
                <VisibilityOffIcon className="eye-icon" />
              )}
            </span>
          </div>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          <b>Submit</b>
        </button>
      </div>
    </div>
  );
}

export default SCpassword;
