import { useState } from "react";
import "./App.css";
import bookData from "./bookData.json";
import BookSelect from "./components/bookselect/BookSelect";
import TimingSelect from "./components/timingselect/TimingSelect";

function App() {
  console.log(bookData);

  return (
    <div className="App">
      <input type="text" placeholder="Plan Title" />

      <BookSelect />

      <hr />

      <TimingSelect />
    </div>
  );
}

export default App;
