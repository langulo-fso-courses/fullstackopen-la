import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => <Part part={part} key={part.id} />)}
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} : {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises: <b>{parts.reduce((totalTime, part) => totalTime + part.exercises, 0)}</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div className="course">
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
