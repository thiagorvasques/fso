import { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";

function App() {
  const [countries, setContries] = useState([]);
  const [results, setResults] = useState([]);
  const [weather, setWeather] = useState({});
  const API_KEY = `${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setContries(response.data));
  }, []);

  useEffect(() => {
    if (results.length === 1) {
      let str = results[0].capital;
      str = str.normalize("NFD").replace(/\p{Diacritic}/gu, "");

      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${str}&units=metric&appid=${API_KEY}`
        )
        .then((response) => {
          console.log(response.data);
          setWeather({
            temp: response.data.main.temp,
            wind: response.data.wind.speed,
          });
        });
    }
  }, [API_KEY, results]);
  const handleInput = (e) => {
    e.preventDefault();
    let name = e.target.value;
    let list = countries.filter((country) => {
      return country.name.toLowerCase().includes(name.toLocaleLowerCase());
    });
    console.log(name);
    if (list.length > 10) {
      setResults("To many matches, specify another filter");
    } else if (list.length <= 10 && list.length > 1) {
      setResults(list);
    } else {
      setResults(list);
    }
  };

  const showCountry = (name) => {
    setResults(
      results.filter((item) => {
        return item.name === name;
      })
    );
  };

  return (
    <div>
      <form>
        <label htmlFor="countries"> Find Countries</label>
        <input type="text" name="countries" onChange={handleInput} />
      </form>
      <Results results={results} showCountry={showCountry} weather={weather} />
    </div>
  );
}

export default App;
