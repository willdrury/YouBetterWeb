import React from "react";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import "./Layout.css"; // Import the CSS file


const Layout = () => {
  return (
    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      <Banner />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;