import React, {useState} from 'react';
import ReactDOM from 'react-dom';

// Button component
const Button = ({clickHandler, btnText}) => <button onClick={clickHandler}>{btnText}</button>

const Statistics = ({good, neutral, bad}) => {
    return (
        <div className="statistics-display">
            <span><p>Good: {good}</p></span>
            <span><p>Neutral: {neutral}</p></span>
            <span><p>Bad: {bad}</p></span>
        </div>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    // Voting function
    const vote = (handler, value) => handler(value+1)

    return (
        <>
        <div>
            <h1>Give feedback</h1>
            <Button clickHandler={() => vote(setGood, good)} btnText="Good"/>
            <Button clickHandler={() => vote(setNeutral, neutral)} btnText="Neutral"/>
            <Button clickHandler={() => vote(setBad, bad)} btnText="Bad"/>
        </div>
        <Statistics good={good} neutral={neutral} bad={bad}/>
        </>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));
