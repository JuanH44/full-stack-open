import {useState} from 'react';
import './App.css';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

	const handleGoodClick = () => setGood(good + 1);
	const handleNeutralClick = () => setNeutral(neutral + 1);
	const handleBadClick = () => setBad(bad + 1);

	
  return (
    <>
			<Heading text="Unicafe" h="h1" />
			
			<Heading text="give feedback" h="h2" />
			<Button text="good" handleClick={handleGoodClick} />
			<Button text="neutral" handleClick={handleNeutralClick} />
			<Button text="bad" handleClick={handleBadClick} />
	
			<Heading text="statistics" h="h2" />
			<Statistics good={good} neutral={neutral} bad={bad} />
			
		</>
  );
}

const Heading = ({text, h:H}) => <H>{text}</H>;

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good - bad) / total;
	const positive = total === 0 ? 0 : good / total * 100;

	if (total === 0) {
		return (
			<div>
				<p>No feedback given</p>
			</div>
		);
	}else{
		return (
			<table>	
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={total} />
				<StatisticLine text="average" value={average} />
				<StatisticLine text="positive" value={positive+" %"} />
			</table>
		);
	}
}

const StatisticLine  = ({text, value}) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	);
}

export default App;
