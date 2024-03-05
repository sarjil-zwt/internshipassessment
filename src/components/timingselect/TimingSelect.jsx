import React, { useState } from "react";
import "./TimingSelect.css";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimingSelect = () => {
  const [timingState, setTimingState] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const handleTimeAddButtonClick = (index) => {
    const newField = {
      startTime: "",
      endTime: "",
    };

    const updatedTimes = {
      ...timingState,
    };

    updatedTimes[index] = [...timingState[index], newField];
    console.log(updatedTimes);

    setTimingState(updatedTimes);
  };

  return (
    <div className="timingselectdivswrapper">
      {Object.keys(timingState).map((k) => {
        return (
          <>
            <div key={k} className="timingselectdiv">
              <div className="timingselectheading">
                <p>{k}</p>
                <p className="displaydays">{days[k]}</p>
              </div>
              <div className="dividerhz"></div>
              {timingState[k].map((t) => {
                return (
                  <>
                    <div className="timingselectoptionsdiv">
                      <div className="timingselectoptionelement">
                        <p>From Time</p>
                        <select
                          className="timeselectelement"
                          name="fromtime"
                          id=""
                        ></select>
                      </div>
                      <div className="timingselectoptionelement">
                        <p>To Time</p>
                        <select
                          className="timeselectelement"
                          name="untilltime"
                          id=""
                        ></select>
                      </div>
                    </div>
                    <div className="dividerhz"></div>
                  </>
                );
              })}
              <button onClick={() => handleTimeAddButtonClick(k)}>+</button>
            </div>
            <div className="divider"></div>
          </>
        );
      })}
    </div>
  );
};

export default TimingSelect;
