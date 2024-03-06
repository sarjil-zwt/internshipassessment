import { useState } from "react";
import "./App.css";
import bookData from "./bookData.json";
import BookSelect from "./components/bookselect/BookSelect";
import TimingSelect from "./components/timingselect/TimingSelect";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [enddate, setEnddate] = useState("");
  const [planName, setPlanName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([
    {
      bookId: "",
      chapters: [],
      chaptersOptions: [],
      options: bookData,
    },
  ]);
  const [timingState, setTimingState] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    const today = new Date(Date.now());

    if (date.getTime() <= today) {
      return toast("👿 Please select date from tomorrow 👿");
    }

    if (!selectedBooks || !timingState) {
      return toast("👿 Please Select books and times 👿");
    }

    let totalreadingTime = 0;

    selectedBooks.map((book) => {
      book.chapters.map((chapter) => {
        totalreadingTime +=
          book.chaptersOptions[Number.parseInt(chapter) - 1].no_of_words;
      });
    });

    let totalWeekTime = 0;

    for (let i = 0; i < 7; i++) {
      let singleDayTime = 0;

      timingState[i].forEach((time) => {
        if (time.startTime.length > 0 && time.endTime.length > 0) {
          singleDayTime +=
            JSON.parse(time.endTime).t - JSON.parse(time.startTime).t;
        }
      });

      totalWeekTime += singleDayTime;
    }

    if (totalWeekTime <= 0) {
      return toast("🙏 Please select some time to read 🙏");
    }

    let index = date.getDay();
    let totalReadingDays = 0;

    while (totalreadingTime > 0) {
      let singleDayTime = 0;

      timingState[index].forEach((time) => {
        if (time.startTime.length > 0 && time.endTime.length > 0) {
          singleDayTime +=
            JSON.parse(time.endTime).t - JSON.parse(time.startTime).t;
        }
      });

      const readingMinutes = singleDayTime * 15 * 50;

      totalreadingTime -= readingMinutes;

      if (totalreadingTime <= 0) {
        break;
      }
      if (index == 6) {
        index = 0;
        totalReadingDays++;
      } else {
        index++;
        totalReadingDays++;
      }
    }

    const endDate = new Date(date.setDate(date.getDate() + totalReadingDays));

    setEnddate(endDate);
  };

  //Random Id Generation
  function generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  const handleSubmit = () => {
    if (planName.length == 0 || startDate.length == 0) {
      return toast("👿 Please enter all fields 👿");
    }

    const enteries = localStorage.getItem("entries")
      ? JSON.parse(localStorage.getItem("entries"))
      : null;

    const entry = enteries.find((e) => e.title == planName);

    if (entry) {
      return toast("😥 Plan name already exist 😥");
    }

    const newTimingState = timingState;

    Object.keys(newTimingState).forEach((k) => {
      newTimingState[k] = newTimingState[k].map((o) => {
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
          id: generateUUID(),
          title: planName,
          books: selectedBooks.map((b) => {
            return {
              book_id: b.bookId,
              chapters: [...b.chapters],
            };
          }),
          timing: newTimingState,
          start_date: moment(startDate, "dd-mm-yyyy"),
          end_date: moment(enddate, "dd-mm-yyyy"),
        },
      ];

      localStorage.setItem("entries", JSON.stringify(newArray));
    } else {
      const newArray = [
        ...enteries,
        {
          id: generateUUID(),
          title: planName,
          books: selectedBooks.map((b) => {
            return {
              book_id: b.book_id,
              chapters: [...b.chapters],
            };
          }),
          timing: newTimingState,
          start_date: moment(startDate, "dd-mm-yyyy"),
          end_date: moment(enddate, "dd-mm-yyyy"),
        },
      ];

      localStorage.setItem("entries", JSON.stringify(newArray));
    }

    setSelectedBooks([
      {
        bookId: "",
        chapters: [],
        chaptersOptions: [],
        options: bookData,
      },
    ]);

    setTimingState({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    });

    setPlanName("");
    setEnddate("");
    setStartDate("");
    toast.success("Entry Added");
  };

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={true} />

      <div className="top">
        <h1>👨🏻‍💻 Interns Practical Assessment 👨🏻‍💻</h1>
        <div>
          <p>Plan Name: </p>
          <input
            type="text"
            placeholder="Plan Title"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>
      </div>

      <BookSelect
        selectedBooks={selectedBooks}
        setSelectedBooks={setSelectedBooks}
      />

      <TimingSelect timingState={timingState} setTimingState={setTimingState} />

      <div className="footer">
        <div className="dates">
          <div>
            <p>Start Date</p>
            <input
              type="date"
              className="startdate"
              onChange={handleDateChange}
              name=""
              id=""
            />
          </div>

          <div>
            <p className="">End Date </p>
            <p className="enddate">
              {enddate
                ? moment(enddate).format("ll")
                : "Please select start date first"}
            </p>
          </div>
        </div>

        <button className="submitbutton" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;
