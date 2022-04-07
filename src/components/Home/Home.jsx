import React, { useState } from "react";
import Counter from "../Counter/Counter";
import Map from "../Map/Map";

import "./Home.scoped.scss";
const SelectedContext = React.createContext("light");

export default function Home(props) {
  const [selected, setSelected] = useState(null);
  const [worldData, setWorldData] = useState(null);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const handleEnter = () => {};
  return (
    <div className="wrapper">
      <Counter worldData={worldData} selected={selected} />
      <Map
        setWorldData={setWorldData}
        setSelected={setSelected}
        selected={selected}
      ></Map>
    </div>
  );
}
