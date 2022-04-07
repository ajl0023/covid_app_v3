import { useState } from "react";
import { ReactComponent as CovidIcon } from "../../svgs/covid-19.svg";
import "./Navbar.scoped.scss";
export default function Navbar(props) {
  const handleChange = (value, cb) => {
    cb(value);
  };
  const handleEnter = () => {};
  return (
    <div className="wrapper p-3">
      <div className="content-container">
        <div className="title-container me-3">
          <h6 className="title">Covid-19 Tracker</h6>
        </div>
        <div className="icon-container">
          <CovidIcon fill="white" />
        </div>
      </div>
    </div>
  );
}
