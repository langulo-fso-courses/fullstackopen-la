import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  console.log("Header: ", props)
  return <h1>{props.course.name}</h1>;
};

const Content = props => {
  console.log("content compn:", props.parts[0]);
  return (
    <>
      <Part course={props.parts[0]} />
      <Part course={props.parts[1]} />
      <Part course={props.parts[2]} />
    </>
  );
};

const Part = props => {
  console.log("part compn:", props.course);
  return (
    <p>
      {props.course.name} : {props.course.exercises}
    </p>
  );
};

const Total = props => {
  return <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>;
};

const App = props => {
  const course = {
    name:"Half Stack application development",
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  
  const [...parts] = course.parts;

  return (
    <div className="course-canvas">
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
