import React, { useState, useEffect } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useMutation } from "@apollo/client";

function BithYear({ authors }) {
  const firstNullYear = authors.find((a) => a.born === null);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    setName(firstNullYear ? firstNullYear.name : null);
  }, [firstNullYear]);

  const setBorn = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, year } });
    setYear("");
    setName("");
  };

  const handleChange = (e) => {
    e.preventDefault();

    setName(e.target.value);
  };

  return (
    <div>
      <h1>Set Birth year </h1>
      <form onSubmit={setBorn}>
        <label>
          Select Author
          <select value={name} onChange={handleChange}>
            {authors.map((a) => {
              if (a.born === null) {
                return (
                  <option value={a.name} key={a.id}>
                    {a.name}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </label>
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(Number(target.value))}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BithYear;
