import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <>
      <Part course={props.parts.part1} />
      <Part course={props.parts.part2} />
      <Part course={props.parts.part3} />
    </>
  );
};

const Part = props => {
  return (
    <p>
      {props.course.part} : {props.course.exAmount}
    </p>
  );
};

const Total = props => {
  return <p>Number of exercises: {props.exAmount}</p>;
};

const App = props => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  let parts = {
    part1: {
      part: part1,
      exAmount: exercises1
    },
    part2: {
      part: part2,
      exAmount: exercises2
    },
    part3: {
      part: part3,
      exAmount: exercises3
    }
  };

  return (
    <div className="course-canvas">
      <Header course={course} />
      <Content parts={parts} />
      <Total exAmount={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
