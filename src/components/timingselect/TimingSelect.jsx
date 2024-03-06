import React, { useState } from "react";
import "./TimingSelect.css";
import times from "../times";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimingSelect = ({ timingState, setTimingState }) => {
  const handleTimeAddButtonClick = (index) => {
    if (timingState[index].length > 0) {
      if (
        timingState[index][timingState[index].length - 1].startTime === "" ||
        timingState[index][timingState[index].length - 1].endTime === ""
      ) {
        return alert(
          `please enter from time and end time for week ${days[index]}`
        );
      }

      timingState[index][timingState[index].length - 1].disabled = true;
    }

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

  const isFromOptionDisabled = (k, time) => {
    let timesOfDay = timingState[k];
    // console.log(timesOfDay, "Times of day");

    if (timesOfDay.length > 1) {
      for (let i = 0; i < timesOfDay.length - 1; i++) {
        const element = timesOfDay[i];
        if (
          JSON.parse(element.startTime).t - 1 <= time.t &&
          time.t <= JSON.parse(element.endTime).t
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const isToOptionDisabled = (k, time, selectedtimeIndex) => {
    if (timingState[k][timingState[k].length - 1].startTime.length > 0) {
      let timesOfDay = timingState[k];

      if (
        time.t <=
        JSON.parse(timingState[k][timingState[k].length - 1].startTime).t
      ) {
        return true;
      }

      let nextElement = {};
      let difference = 100;

      if (timesOfDay.length > 1) {
        for (let i = 0; i < timesOfDay.length - 1; i++) {
          const element = timesOfDay[i];
          if (
            JSON.parse(element.startTime).t >
              JSON.parse(timingState[k][timingState[k].length - 1].startTime)
                .t &&
            time.t >= JSON.parse(element.startTime).t
          ) {
            return true;
          }
        }
      }

      if (time.t >= nextElement.t) {
        return true;
      }

      return false;
    }
  };

  const handleFromTimeChange = (e, k) => {
    const updatedTimes = {
      ...timingState,
    };
    updatedTimes[k][updatedTimes[k].length - 1].startTime = e.target.value;
    setTimingState(updatedTimes);
  };

  const handleToTimeChange = (e, k) => {
    const updatedTimes = {
      ...timingState,
    };
    updatedTimes[k][updatedTimes[k].length - 1].endTime = e.target.value;
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
              {timingState[k].map((selectedtime, i) => {
                return (
                  <>
                    <div className="timingselectoptionsdiv" key={i}>
                      <div className="timingselectoptionelement">
                        <p>From Time</p>
                        <select
                          className="timeselectelement"
                          name="fromtime"
                          id=""
                          onChange={(e) => handleFromTimeChange(e, k)}
                          disabled={selectedtime.disabled}
                        >
                          <option value=""></option>
                          {times.map((t) => {
                            return (
                              <option
                                value={JSON.stringify(t)}
                                disabled={isFromOptionDisabled(k, t)}
                              >
                                {`${t.hours}:${t.minutes} ${t.meridiem}`}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="timingselectoptionelement">
                        <p>To Time</p>
                        <select
                          className="timeselectelement"
                          name="untilltime"
                          id=""
                          onChange={(e) => handleToTimeChange(e, k)}
                          disabled={
                            selectedtime.startTime == "" ||
                            selectedtime.disabled
                          }
                        >
                          <option value=""></option>
                          {selectedtime.startTime.length > 0 &&
                            times.map((t) => {
                              return (
                                <option
                                  value={JSON.stringify(t)}
                                  disabled={isToOptionDisabled(k, t, i)}
                                >{`${t.hours}:${t.minutes} ${t.meridiem}`}</option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="dividerhz"></div>
                  </>
                );
              })}
              <button
                disabled={
                  timingState[k].startTime === "" ||
                  timingState[k].endTime === ""
                }
                onClick={() => handleTimeAddButtonClick(k)}
              >
                +
              </button>
            </div>
            {k != 6 && <div className="divider"></div>}
          </>
        );
      })}
    </div>
  );
};

export default TimingSelect;
