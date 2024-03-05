import { useState } from "react";
import "./App.css";
import bookData from "./bookData.json";
import BookSelect from "./components/bookselect/BookSelect";
import TimingSelect from "./components/timingselect/TimingSelect";

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

    const enteries = JSON.parse(localStorage.getItem("entries"));

    // if(!enteries){
    //   const newArray = [];
    //   newArray = [...newArray,{
    //     id:"sasdsadas",
    //     title:planName,
    //     books:
    //   }]
    // }else{

    // }
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
