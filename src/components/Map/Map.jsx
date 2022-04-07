import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import Tooltip from "../Tooltip/Tooltip";
import { scaleQuantile, scaleQuantize } from "d3-scale";
import _ from "lodash";
import "./Map.scoped.scss";
import axios from "axios";
import InfoCard from "../InfoCard/InfoCard";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const Memoized = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const Component = useMemo(() => {
    return (
      <div className="map-container">
        {props.selected && modalVisible && (
          <InfoCard
            setModalVisible={setModalVisible}
            selected={props.selected}
            closeModal={closeModal}
          />
        )}
        <ComposableMap
          viewBox="0 100 800 400"
          data-tip=""
          projectionConfig={{ scale: 147 }}
        >
          <Graticule stroke="#dadce0" />
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              return geographies.map((geo) => {
                const { NAME, NAME_LONG, ISO_A3, ISO_A2 } = geo.properties;

                if (props.colorScale) {
                  return (
                    <Geography
                      onMouseEnter={() => {
                        props.setHoverContent(NAME);
                      }}
                      onMouseLeave={() => {
                        props.setHoverContent(null);
                      }}
                      onClick={() => {
                        props.setSelected({
                          ...props.recentData[ISO_A3],
                          ISO_A2: ISO_A2,
                        });
                        setModalVisible(true);
                      }}
                      fill={props.setGradient(geo)}
                      // cur={cur}
                      stroke="#EAEAEC"
                      strokeWidth="0.4px"
                      cursor="pointer"
                      key={geo.rsmKey}
                      geography={geo}
                    />
                  );
                }
              });
            }}
          </Geographies>
        </ComposableMap>
      </div>
    );
  }, [props.colorScale, props.selected, modalVisible]);
  return Component;
};

export default function Map(props) {
  const [recentData, setRecentData] = useState({});
  const [hoverContent, setHoverContent] = useState(null);

  const recentData_arr = useMemo(() => {
    if (!_.isEmpty(recentData)) {
      const arr = [];
      for (const name in recentData) {
        if (Object.hasOwnProperty.call(recentData, name)) {
          const element = recentData[name].total_cases;
          arr.push(element);
        }
      }
      return arr;
    }
  }, [recentData]);

  useEffect(async () => {
    const main_data = await axios(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
    );
    const data_obj = {};

    setRecentData(main_data.data);
    props.setWorldData(main_data.data["OWID_WRL"]);
  }, []);

  const colorScale = useMemo(() => {
    if (recentData_arr) {
      return scaleQuantile()
        .domain([...recentData_arr])
        .range([
          "#EAF2F8",
          "#7FB3D5",
          "#7FB3D5",
          "#5499C7",
          "#2980B9",
          "#2471A3",
          "#1F618D",
          "#1A5276",
          "#154360",
        ]);
    }
  }, [recentData_arr]);
  const setGradient = (geo) => {
    const value = recentData[geo.properties.ISO_A3]
      ? recentData[geo.properties.ISO_A3].total_cases
      : 0;

    return colorScale(value);
  };
  return (
    <div className="wrapper p-3">
      <Tooltip content={hoverContent} />
      <Memoized
        selected={props.selected}
        colorScale={colorScale}
        setHoverContent={setHoverContent}
        setSelected={props.setSelected}
        recentData={recentData}
        setGradient={setGradient}
      >
        {/* {selected && <InfoCard selected={selected} closeModal={closeModal} />} */}
      </Memoized>
    </div>
  );
}
