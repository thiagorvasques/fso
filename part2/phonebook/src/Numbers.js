import React from "react";

function Numbers(props) {
  return (
    <div>
      <h2>Numbers</h2>
      {props.nameSearch.length > 0
        ? props.results.map((person) => {
            console.log(person);
            return (
              <div key={person.name}>
                {person.name}: {person.number}
              </div>
            );
          })
        : props.persons.map((person) => {
            return (
              <div key={person.name}>
                {person.name}: {person.number}
              </div>
            );
          })}
    </div>
  );
}

export default Numbers;
