import React, { useEffect, useState } from "react";

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
    <div>
      <table>
        <thead>
          <th></th>
        </thead>
      </table>
    </div>
  );
};

export default Entries;
