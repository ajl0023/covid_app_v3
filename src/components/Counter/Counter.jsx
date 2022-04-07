import { useEffect, useState } from "react";
import CountUp from "react-countup";

import "./Counter.scoped.scss";
export default function Counter(props) {
  const [counters, setCounters] = useState([]);
  const handleChange = (value, cb) => {
    cb(value);
  };
  const main_data = props.selected ? props.selected : props.worldData;

  useEffect(() => {
    if (main_data) {
      setCounters([
        {
          title: "Total Cases",
          value: main_data.total_cases,
        },
        {
          title: "Total Deaths",
          value: main_data.total_deaths,
        },
        {
          title: "Total Vaccinations",
          value: main_data.total_vaccinations,
        },
      ]);
    }
  }, [props.selected, props.worldData]);
  return (
    <div className="wrapper">
      {counters && (
        <>
          {counters.map((item, i) => {
            return (
              <div key={item.title} className="count-container">
                <div className="count-title">{item.title}</div>
                <div className="counter">
                  <CountUp
                    separator=","
                    format="d"
                    duration="1"
                    end={item.value}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
