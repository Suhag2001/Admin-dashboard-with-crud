import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login.component";
import Signup from "./signup.component";

function LoginRouting() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}
export default LoginRouting;
