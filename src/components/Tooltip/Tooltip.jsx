import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { HandleMouse } from "./main";
import "./Tooltip.scoped.scss";
const Component = (props) => {
  const tooltip = useRef();

  useEffect(() => {
    const handleMouse = new HandleMouse(tooltip.current);

    window.addEventListener("mousemove", (e) => {
      handleMouse.onMouseMove(e);
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {
        handleMouse.onMouseMove(e);
      });
    };
  }, []);

  return (
    <div
      ref={tooltip}
      style={{
        display: props.content ? "block" : "none",
      }}
      className="tooltip-wrapper"
    >
      <span>{props.content}</span>
    </div>
  );
};
export default function (props) {
  return ReactDOM.createPortal(
    <Component {...props} />,
    document.querySelector("#tooltip-container")
  );
}
