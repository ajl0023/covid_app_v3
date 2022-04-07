import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useCloseModal } from "src/hooks/useCloseModal";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import moment from "moment";
import * as d3 from "d3";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./InfoCard.scoped.scss";
import Loading from "../Loading/Loading";
function InfoCard(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const stats = useMemo(() => {
    return [
      {
        title: "Total Cases",
        value: props.selected.total_cases,
      },
      {
        title: "New Cases",
        value: props.selected.new_cases,
      },
      {
        title: "New Tests",
        value: props.selected.new_tests,
      },
    ];
  }, []);

  const { modal, closeModal } = useCloseModal(() => {
    props.closeModal();
  });

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      const data = await axios(
        `https://corona.lmao.ninja/v2/historical/${props.selected.location}?lastdays=365`
      );
      let formatted = [];
      if (!ignore) {
        setData(formatted);
        setLoading(false);
      }
      for (const date in data.data.timeline.cases) {
        if (Object.hasOwnProperty.call(data.data.timeline.cases, date)) {
          const element = data.data.timeline.cases[date];
          formatted.push({
            date: date,
            cases: element,
          });
        }
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  let flag_iso = props.selected.ISO_A2.toLowerCase();
  return (
    <ModalWrapper closeModal={closeModal}>
      <div className="wrapper">
        <div ref={modal} className="main-container">
          <div className="graph-header p-2">
            <div className="flag-image-container me-2">
              <img
                src={`https://flagcdn.com/16x12/${flag_iso}.png`}
                srcset={`https://flagcdn.com/32x24/${flag_iso}.png 2x,
    https://flagcdn.com/48x36/${flag_iso}.png 3x`}
                width="100%"
                height="100%"
                alt="united states"
              />
            </div>
            <div className="country-name">{props.selected.location}</div>
          </div>
          <div className="graph-wrapper">
            <div className="aspect-ratio-container">
              <div className="graph-container">
                {data && !loading ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        minTickGap={20}
                        interval={"preserveEnd"}
                        dataKey="date"
                      />
                      <YAxis
                        tickFormatter={(val) => {
                          return d3.format(".2s")(val);
                        }}
                      />

                      <Legend />
                      <Line
                        dot={false}
                        type="monotone"
                        dataKey="cases"
                        stroke="#8884d8"
                      />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
          <div className="stats-container">
            {stats.map((item) => {
              return (
                <div className="item" key={item.title}>
                  <h6 className="label">{item.title}</h6>
                  <div className="stat-value">
                    {item.value !== null ? item.value.toLocaleString() : "N/A"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
export default InfoCard;
