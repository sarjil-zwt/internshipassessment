import { useState } from "react";
import "./App.css";
import bookData from "./bookData.json";
import BookSelect from "./components/bookselect/BookSelect";
import TimingSelect from "./components/timingselect/TimingSelect";

function App() {
  const [enddate, setEnddate] = useState("");

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const today = new Date(Date.now());

    if (date.getTime() <= today) {
      return alert("Please select date from tomorrow");
    }

    const selectedBooks = JSON.parse(localStorage.getItem("selectedbooks"));
    const selectedTimes = JSON.parse(localStorage.getItem("selectedtimes"));

    let totalreadingTime = 0;

    selectedBooks.map((book) => {
      book.chapters.map((chapter) => {
        totalreadingTime +=
          book.chaptersOptions[Number.parseInt(chapter) - 1].no_of_words;
      });
    });

    let index = 0;
    let totalReadingDays = 0;

    while (totalreadingTime > 0) {
      let singleDayTime = 0;

      selectedTimes[index].forEach((time) => {
        if (!time.startTime == "" || time.endTime == "") {
          singleDayTime +=
            JSON.parse(time.endTime).t - JSON.parse(time.startTime).t;
        }
      });

      const readingMinutes = singleDayTime * 15 * 50;

      console.log(readingMinutes, index, "*******&&&&&&&*********");

      totalreadingTime -= readingMinutes;

      totalReadingDays++;
      if (index == 6) {
        index = 0;
      } else {
        index++;
      }
    }

    console.log(totalReadingDays, "Total reading days");

    const endDate = new Date(
      date.setDate(date.getDate() + (totalReadingDays - 1))
    );

    setEnddate(endDate);
  };

  return (
    <div className="App">
      <input type="text" placeholder="Plan Title" />

      <BookSelect />

      <hr />

      <TimingSelect />

      <div className="footer">
        <input type="date" onChange={handleDateChange} name="" id="" />
        {enddate && (
          <p className="enddate">End Date - {new Date(enddate).toString()}</p>
        )}
      </div>
    </div>
  );
}

export default App;
