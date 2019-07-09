import React, { useState } from "react";
import ReactDOM from "react-dom";

// Button component
const Button = ({ clickHandler, btnText }) => (
  <button onClick={clickHandler}>{btnText}</button>
);

const Statistics = props => <div className="statistics-display">{props.stats.map(stat => (<p><b>{stat.name}</b>: {stat.value}</p>))}</div>

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
      <Statistics stats={[{name: "Good",value: good}, {name: "Neutral", value: neutral}, {name: "Bad",value: bad}]} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
