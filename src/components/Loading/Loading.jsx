import { useState } from "react";

import "./Loading.scoped.scss";
export default function Loading(props) {
  const handleChange = (value, cb) => {
    cb(value);
  };
  const handleEnter = () => {};
  return (
    <div className="wrapper">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
