import React, { useState, useEffect } from "react";

function Genres({ books, filterBooks }) {
  const [genresArr, setGenresArr] = useState([]);

  useEffect(() => {
    //array with arrary of genres
    let arr = books.map((b) => {
      return b.genres;
    });
    // array of genres filtered
    const unique = arr.flat().filter((item, i, arr) => arr.indexOf(item) === i);
    setGenresArr(unique);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {genresArr.map((g, i) => {
        if (g === "") {
          return null;
        }
        return (
          <button key={i} value={g} onClick={(e) => filterBooks(e)}>
            {g}
          </button>
        );
      })}
      <button value="allgenres" onClick={(e) => filterBooks(e)}>
        All genres
      </button>
    </div>
  );
}

export default Genres;
