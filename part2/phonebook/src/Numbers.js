import React from "react";

function Numbers({ nameSearch, persons, results, deletePerson }) {
  return (
    <div>
      <h2>Numbers</h2>
      {nameSearch.length > 0
        ? results.map((person) => {
            console.log(person);
            return (
              <div key={person.name}>
                {person.name}: {person.number}
              </div>
            );
          })
        : persons.map((person, index) => {
            return (
              <div key={person.name}>
                {person.name}: {person.number}{" "}
                <button
                  type="button"
                  onClick={() => deletePerson(person.id, index)}
                >
                  Delete
                </button>
              </div>
            );
          })}
    </div>
  );
}

export default Numbers;
