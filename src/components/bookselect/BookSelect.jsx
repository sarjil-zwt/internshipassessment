import React, { useState } from "react";
import bookData from "../../bookData.json";

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

    const filteredBookOptions = lastSelectedBook?.options?.filter(
      (o) => o.id != lastSelectedBook.bookId
    );

    console.log(lastSelectedBook, filteredBookOptions, "%%%%%%%%%%%%");

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
          disabled: true,
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
  };
  return (
    <div className="bookselectdivswrapper">
      {selectedBooks?.map((sb, index) => {
        console.log(sb.bookId);
        return (
          <div className="bookselectdiv">
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

            <select
              name=""
              id=""
              multiple
              onChange={(e) => hadleChaptersChange(e, index)}
            >
              {sb?.chaptersOptions?.map((chapter) => {
                return <option value={chapter.id}>{chapter.name}</option>;
              })}
            </select>
          </div>
        );
      })}

      <button onClick={handleAddBook}>+</button>
    </div>
  );
};

export default BookSelect;
