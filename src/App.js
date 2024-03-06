import { useState } from "react";
import "./App.css";
import bookData from "./bookData.json";
import BookSelect from "./components/bookselect/BookSelect";
import TimingSelect from "./components/timingselect/TimingSelect";
import moment from "moment";

function App() {
  const [enddate, setEnddate] = useState("");
  const [planName, setPlanName] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    const today = new Date(Date.now());

    if (date.getTime() <= today) {
      return alert("Please select date from tomorrow");
    }

    const selectedBooks = JSON.parse(localStorage.getItem("selectedbooks"));
    const selectedTimes = JSON.parse(localStorage.getItem("selectedtimes"));

    if (!selectedBooks || !selectedTimes) {
      return alert("Please Select books and times");
    }

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
        if (time.startTime.length > 0 && time.endTime.length > 0) {
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

  const handleSubmit = () => {
    if (planName.length == 0 || startDate.length == 0) {
      return alert("Please enter all fields");
    }

    const enteries = localStorage.getItem("entries")
      ? JSON.parse(localStorage.getItem("entries"))
      : null;

    const selectedBooks = localStorage.getItem("selectedbooks")
      ? JSON.parse(localStorage.getItem("selectedbooks"))
      : null;
    const selectedTimes = localStorage.getItem("selectedtimes")
      ? JSON.parse(localStorage.getItem("selectedtimes"))
      : null;

    if (!selectedBooks || !selectedTimes) {
      return alert(
        "Something went wrong please refresh the page and try to add fields again!!"
      );
    }

    Object.keys(selectedTimes).forEach((k) => {
      selectedTimes[k] = selectedTimes[k].map((o) => {
        let stime = JSON.parse(o.startTime);
        let etime = JSON.parse(o.endTime);
        return {
          start: stime.hours + ":" + stime.minutes + " " + stime.meridiem,
          end: etime.hours + ":" + etime.minutes + " " + etime.meridiem,
        };
      });
    });

    if (!enteries) {
      let newArray = [];
      newArray = [
        ...newArray,
        {
          id: "sasdsadas",
          title: planName,
          books: selectedBooks.map((b) => {
            return {
              book_id: b.bookId,
              chapters: [...b.chapters],
            };
          }),
          timing: selectedTimes,
          start_date: moment(startDate, "dd-mm-yyyy"),
          end_date: moment(enddate, "dd-mm-yyyy"),
        },
      ];

      console.log(newArray);

      localStorage.setItem("entries", JSON.stringify(newArray));
    } else {
      const newArray = [
        ...enteries,
        {
          id: "sasdsadas",
          title: planName,
          books: selectedBooks.map((b) => {
            return {
              book_id: b.book_id,
              chapters: [...b.chapters],
            };
          }),
          timing: selectedTimes,
          start_date: moment(startDate, "dd-mm-yyyy"),
          end_date: moment(enddate, "dd-mm-yyyy"),
        },
      ];

      localStorage.setItem("entries", JSON.stringify(newArray));
      console.log(newArray);
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Plan Title"
        onChange={(e) => setPlanName(e.target.value)}
      />

      <BookSelect />

      <hr />

      <TimingSelect />

      <div className="footer">
        <input type="date" onChange={handleDateChange} name="" id="" />
        {enddate && (
          <p className="enddate">End Date - {new Date(enddate).toString()}</p>
        )}
      </div>

      <button className="submitbutton" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default App;
