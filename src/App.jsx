import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.scss";
import Navbar from "./components/Navbar/Navbar";
import Tooltip from "./components/Tooltip/Tooltip";
const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Home></Home>
    </div>
  );
};
export default App;
