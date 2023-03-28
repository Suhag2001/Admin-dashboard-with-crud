import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AllUsers from "../../pages/AllUsers";
import CategoryManagment from "../../pages/CategoryManagment";
import BusCategoryManagment from "../../pages/BusCategoryManagment";
import BusinessInsights from "../../pages/BusinessInsights";
import HSmanagment from "../../pages/HSmanagment";
import SCpassword from "../../pages/SCpassword";

import SideBar from "./SideBar";

const Routing = () => {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/categrory-managment" element={<CategoryManagment />} />
          <Route
            path="/b-category-managment"
            element={<BusCategoryManagment />}
          />
          <Route path="/b-insights" element={<BusinessInsights />} />
          <Route path="/help-support" element={<HSmanagment />} />
          <Route path="/set-password" element={<SCpassword />} />
        </Routes>
      </SideBar>
    </Router>
  );
};

export default Routing;
