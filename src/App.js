import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Entries from "./pages/entries/Entries";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entries" element={<Entries />} />
      </Routes>
    </div>
  );
}

export default App;
