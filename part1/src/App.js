import React from "react";

/*Exercise 1 and 2 */
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};
const Content = (props) => {
  console.log();
  return (
    <div>
      <Part1
        part1={props.parts.parts[0].name}
        exercises1={props.parts.parts[0].exercises}
      />
      <Part2
        part2={props.parts.parts[1].name}
        exercises2={props.parts.parts[1].exercises}
      />
      <Part3
        part3={props.parts.parts[2].name}
        exercises3={props.parts.parts[2].exercises}
      />
    </div>
  );
};

const Part1 = (props) => {
  return (
    <p>
      {props.part1} {props.exercises1}
    </p>
  );
};
const Part2 = (props) => {
  return (
    <p>
      {props.part2} {props.exercises2}
    </p>
  );
};

const Part3 = (props) => {
  return (
    <p>
      {props.part3} {props.exercises3}
    </p>
  );
};
const Total = (props) => {
  console.log(props);
  return (
    <p>
      Number of exercises:
      {props.parts.parts[0].exercises +
        props.parts.parts[1].exercises +
        props.parts.parts[2].exercises}
    </p>
  );
};

export default App;
