import React, { useState, useEffect, useRef } from "react";

const INITIAL_COUNT = 60;
const twoDigits = (num) => String(num).padStart(2, "0");

function SwitchToggle() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  //   const hoursToDisplay = minutesRemaining - minutesToDisplay;
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  // const otpfun = () => {
  //   if (!username) {
  //     alert("Username is required");
  //     return;
  //   }
  // };
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

  //passing null stops the interval
  return (
    <div>
      {status === STATUS.STARTED ? (
        <div>
          <b id="otp">Resend OTP in </b>
          <b id="timer">
            {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
          </b>
        </div>
      ) : (
        status
      )}
    </div>
  );
}

export default SwitchToggle;
