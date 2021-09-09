import React, { useState } from "react";
import { useField } from "./hooks";
import { useCountry } from "./hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Country from "./components/Country";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Router>
        <Country country={country} />
      </Router>
    </div>
  );
};

export default App;
