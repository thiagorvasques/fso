import React, { useState, useEffect } from "react";
import Genres from "./Genres";
import { FILTER } from "../queries";
import { useLazyQuery } from "@apollo/client";

const Books = ({ books, show, client }) => {
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState("allgenres");
  const [filter, { data }] = useLazyQuery(FILTER, { variables: { genre } });

  useEffect(() => {
    if (data) {
      setFiltered(data.filter);
    }
    filter({ variables: { genre } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, genre]);

  if (!show) {
    return null;
  }

  const filterBooks = async (e) => {
    e.preventDefault();
    setGenre(e.target.value);
    filter({ variables: { genre: "allgenres" } });
  };
  /* Filter Books Frontend*/
  // const filterBooks = (value) => {
  //   console.log("value of filter", value);
  //   if (value === "allgenres") {
  //     console.log("reset book");
  //     setFiltered(books.allBooks);
  //   } else {
  //     setFiltered(books.allBooks.filter((b) => b.genres.includes(value)));
  //   }
  // };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Genres books={books.allBooks} filterBooks={filterBooks} />
    </div>
  );
};

export default Books;
