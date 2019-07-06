import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  console.log("content compn:", props);
  return (
    <>
      <Part course={props.parts[0]} />
      <Part course={props.parts[1]} />
      <Part course={props.parts[2]} />
    </>
  );
};

const Part = props => {
  console.log("part compn:", props);
  return (
    <p>
      {props.course.name} : {props.course.exercises}
    </p>
  );
};

const Total = props => {
  return <p>Number of exercises: {props.exAmount}</p>;
};

const App = props => {
  const course = "Half Stack application development";
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div className="course-canvas">
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exAmount={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
