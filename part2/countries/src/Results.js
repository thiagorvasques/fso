import React from "react";

function Results({ results, showCountry, weather }) {
  return (
    <div>
      {results.length > 10 ? (
        <div>{results}</div>
      ) : results.length <= 10 && results.length > 1 ? (
        results.map((item) => {
          return (
            <div key={item.name}>
              {item.name} :
              <button value={item.name} onClick={() => showCountry(item.name)}>
                show
              </button>
            </div>
          );
        })
      ) : results.length === 1 ? (
        <div>
          <h1>{results[0].name}</h1>
          <p>capital: {results[0].capital}</p>
          <p>population: {results[0].population}</p>
          <h1>Languages</h1>
          <ul>
            {results[0].languages.map((lang) => {
              return (
                <div key={lang.name}>
                  <p>{lang.name}</p>
                </div>
              );
            })}
          </ul>
          <img src={results[0].flag} alt="flag" width="150" height="150" />
          <h1> Weather in {results[0].capital} </h1>
          <p>Temp: {weather.temp}&#8451;</p>
          <p>wind: {Math.floor((weather.wind * 18) / 5)}Km/h</p>
        </div>
      ) : null}
    </div>
  );
}

export default Results;
