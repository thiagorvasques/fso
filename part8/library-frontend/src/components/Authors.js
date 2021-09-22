import React from "react";
import BithYear from "./BithYear";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const authors = props.result;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? <BithYear authors={authors} /> : null}
    </div>
  );
};

export default Authors;
