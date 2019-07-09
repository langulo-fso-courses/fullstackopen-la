import React, { useState } from "react";
import ReactDOM from "react-dom";

// Button component
const Button = ({ clickHandler, btnText }) => (
  <button onClick={clickHandler}>{btnText}</button>
);

const Statistics = ({good, neutral, bad}) => {
    const votes = good + neutral + bad
    // PANIC! We have no votes! We can't continue! Just return a message! AAAAAAHHH!!!
    if (votes === 0) return <div><p>No feedback given</p></div>

    const score = good - bad
    const average = score/votes
    const positives = good/votes

    return(
        <div className="statistics-display">
            <Statistic name="Good" value={good} />
            <Statistic name="Neutral" value={neutral} />
            <Statistic name="Bad" value={bad} />
            <Statistic name="All" value={votes} />
            <Statistic name="Average" value={average}/>
            <Statistic name="Positive" value={positives.toString() + "%"}/>
        </div>
    )
}

// Remember the args will be destructured here (I.E. "props.name, props.value")
const Statistic = ({name, value}) => {
    return(
        <div><span className="statistic-span"><b>{name}: </b>{value}</span></div>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Voting function
  const vote = (handler, value) => handler(value + 1);

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button clickHandler={() => vote(setGood, good)} btnText="Good" />
        <Button
          clickHandler={() => vote(setNeutral, neutral)}
          btnText="Neutral"
        />
        <Button clickHandler={() => vote(setBad, bad)} btnText="Bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
