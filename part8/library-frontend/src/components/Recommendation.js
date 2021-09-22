import React, { useState, useEffect } from "react";
import { ME } from "../queries";
import { useQuery } from "@apollo/client";

function Recommendation({ show, books }) {
  const result = useQuery(ME);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h1>Recommendations</h1>
      <p>Books in my favortie genre {result.data.me.favoriteGenre}</p>
      <table>
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {books.allBooks
            .filter((b) => b.genres.includes(result.data.me.favoriteGenre))
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Recommendation;
