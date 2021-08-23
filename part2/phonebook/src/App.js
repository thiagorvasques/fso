import React, { useState } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Numbers from "./Numbers";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [results, setResults] = useState([]);
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleNewPerson = (e) => {
    e.preventDefault();
    //check name in array
    const inArray =
      persons.find((person) => {
        return person.name.toLocaleLowerCase() === newName.toLocaleLowerCase();
      }) !== undefined;

    if (inArray) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  const searchName = (e) => {
    e.preventDefault();
    setNameSearch(e.target.value);
    setResults(
      persons.filter((person) => {
        return person.name.toLowerCase().includes(nameSearch.toLowerCase());
      })
    );
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} />
      <Form
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
      />
      <Numbers nameSearch={nameSearch} results={results} persons={persons} />
    </div>
  );
};

export default App;
