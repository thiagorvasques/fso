import React from "react";

function Course({ course }) {
  const Header = () => {
    return <h1>{course.name}</h1>;
  };

  const Part = ({ item }) => {
    return (
      <p key={item.id}>
        {item.name}: {item.exercises}
      </p>
    );
  };

  const Total = () => {
    const total = course.parts.reduce((a, b) => {
      a += b.exercises;
      return a;
    }, 0);
    return <h3>Total of {total} exercises</h3>;
  };

  const Content = () => {
    return (
      <div>
        {course.parts.map((item) => {
          return (
            <div key={item.id}>
              <Part item={item} />
            </div>
          );
        })}
        <Total course={course} />
      </div>
    );
  };
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

export default Course;
