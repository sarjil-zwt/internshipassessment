import React, { useState } from "react";
import bookData from "../../bookData.json";
import "./BookSelect.css";

const BookSelect = () => {
  const [selectedBooks, setSelectedBooks] = useState([
    {
      bookId: "",
      chapters: [],
      chaptersOptions: [],
      options: bookData,
    },
  ]);

  const handleAddBook = () => {
    const lastSelectedBook = selectedBooks[selectedBooks.length - 1];

    if (lastSelectedBook.bookId.length <= 0) {
      return alert("Please select all fields");
    }

    const filteredBookOptions = lastSelectedBook?.options?.filter(
      (o) => o.id != lastSelectedBook.bookId
    );

    lastSelectedBook.disabled = true;

    setSelectedBooks([
      ...selectedBooks,
      {
        bookId: "",
        chapters: [],
        chaptersOptions: [],
        options: [...filteredBookOptions],
      },
    ]);
  };

  const handleSelectedBook = (e, index) => {
    const updatedBooks = selectedBooks.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          bookId: e.target.value,

          chaptersOptions: bookData[index].chapters,
        };
      }
      return item;
    });

    setSelectedBooks(updatedBooks);
  };

  const hadleChaptersChange = (e, index) => {
    const updatedBooks = selectedBooks.map((item, idx) => {
      const options = [...e.target.selectedOptions];
      const values = options.map((option) => option.value);
      if (idx === index) {
        return {
          ...item,
          chapters: values,
        };
      }
      return item;
    });
    console.log(updatedBooks);
    setSelectedBooks(updatedBooks);

    localStorage.setItem("selectedbooks", JSON.stringify(updatedBooks));
  };
  return (
    <div className="bookselectdivswrapper">
      {selectedBooks?.map((sb, index) => {
        return (
          <div className="bookselectdiv">
            <div className="bookselectelement">
              <p>Select Book</p>
              <select
                name="select"
                id=""
                key={index}
                onChange={(e) => handleSelectedBook(e, index)}
                disabled={sb.disabled}
              >
                <option value=""></option>
                {sb?.options?.map((o) => {
                  return <option value={o.id}>{o.name}</option>;
                })}
              </select>
            </div>
            <div className="bookselectelement">
              <p>Select Chapters</p>
              <select
                name=""
                id=""
                multiple
                onChange={(e) => hadleChaptersChange(e, index)}
                disabled={sb.disabled}
                className="bookchapterselect"
              >
                {sb?.chaptersOptions?.map((chapter) => {
                  return <option value={chapter.id}>{chapter.name}</option>;
                })}
              </select>
            </div>
          </div>
        );
      })}

      <button onClick={handleAddBook}>+</button>
    </div>
  );
};

export default BookSelect;
