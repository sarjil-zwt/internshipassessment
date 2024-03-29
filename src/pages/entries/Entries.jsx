import React, { useEffect, useState } from "react";
import "./Entries.css";
import { Link } from "react-router-dom";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Entries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(
      localStorage.getItem("entries")
        ? JSON.parse(localStorage.getItem("entries"))
        : []
    );
  }, []);

  return (
    <div className="entriespage">
      <h1>Entries</h1>

      <div className="body">
        {entries.map((entry, index) => {
          return (
            <div className="entry">
              <p>SR. No - {index + 1}</p>
              <p>ID - {entry.id}</p>
              <p>Title - {entry.title}</p>
              <div className="booksdiv">
                <p>Books - </p>
                <div>
                  {entry.books.map((book) => {
                    return (
                      <div className="singlebook">
                        <p>book id -{book.book_id}</p>
                        <div>
                          {book.chapters.map((chapter) => (
                            <p>chapter - {chapter}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="timing">
                <p>Timings - </p>
                <div className="timingswrapper">
                  {Object.keys(entry.timing).map((k) => {
                    return entry.timing[k].length > 0 ? (
                      <div className="singletiming">
                        <p>{days[k]} - </p>
                        <div className="singledaytimes">
                          {entry.timing[k].map((time) => {
                            return (
                              <div>
                                <p>Start - {time.start}</p>
                                <p>End - {time.end}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <p>Start Date - {entry.start_date}</p>
              <p>End Date - {entry.end_date}</p>
            </div>
          );
        })}
      </div>

      <Link to={"/"}>Back</Link>
    </div>
  );
};

export default Entries;
