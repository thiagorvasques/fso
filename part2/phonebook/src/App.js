import React, { useState, useEffect } from "react";
import Form from "./Form";
import Filter from "./Filter";
import Numbers from "./Numbers";
import services from "./services/persons";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    services.getAll().then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleNewPerson = (e) => {
    e.preventDefault();
    //check name in array
    const inArray = persons.filter(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );
    console.log(inArray);
    if (inArray.length >= 1) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const updated = { ...inArray[0], number: newNumber };
        updatePerson(inArray, updated);
      }
    } else {
      //setPersons(persons.concat({ name: newName, number: newNumber }));
      const newPerson = { name: newName, number: newNumber };
      createNewPerson(newPerson);
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

  const deletePerson = (id, index) => {
    if (window.confirm(`Delete ${persons[index].name}?`)) {
      services
        .deletePerson(id)
        .then((response) => {
          console.log(response);
          setPersons(
            persons.filter((person) => {
              console.log(person.id, typeof person.id, id, typeof id);
              return id !== person.id;
            })
          );
          setMessage(`${persons[index].name} was deleted.`);
        })
        .catch((err) => {
          console.log(err);
          setMessage(`${persons[index].name} was already deleted`);
        });
    }
  };

  const updatePerson = (arr, updated) => {
    services
      .update(arr[0].id, updated)
      .then((response) => {
        //console.log(response);
        setPersons(
          persons.map((person) => (person.id !== arr[0].id ? person : updated))
        );
        setNewName("");
        setNewNumber("");
        setMessage(`${updated.name}´s number updated`);
      })
      .catch((err) => {
        console.log(err);
        setMessage(`information of ${updated.name} has already been removed`);
      });
  };

  const createNewPerson = (newPerson) => {
    services
      .create(newPerson)
      .then((response) => setPersons(persons.concat(response.data)))
      .catch((err) => {
        console.log(err.response.data.error);
        setMessage(err.response.data.error);
      });
    setNewName("");
    setNewNumber("");
    setMessage(`${newName} added to list`);
  };

  const deleteMessage = () => {
    setMessage("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification deleteMessage={deleteMessage} message={message} />
      <Filter searchName={searchName} />
      <Form
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        handleNewPerson={handleNewPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers
        nameSearch={nameSearch}
        results={results}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
