import React, { useState } from "react";

const Buttons = (props) => {
  return (
    <div>
      <button onClick={props.handleGood()}>good</button>
      <button onClick={props.handleNetural()}>netural</button>
      <button onClick={props.handleBad()}>bad</button>
    </div>
  );
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}:</td>
      {props.text === "positive" ? (
        <td>{props.value}%</td>
      ) : (
        <td>{props.value}</td>
      )}
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNetural = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Buttons
        handleGood={() => handleGood}
        handleBad={() => handleBad}
        handleNetural={() => handleNetural}
      />
      <h1>Statistics</h1>
      {good !== 0 || neutral !== 0 || bad !== 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="All" value={good + neutral + bad} />
            <StatisticLine
              text="Average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <StatisticLine
              text="positive"
              value={(good / (good + neutral + bad)) * 100}
            />
          </tbody>
        </table>
      ) : (
        <p>No Feedback given</p>
      )}
    </div>
  );
};

export default App;
