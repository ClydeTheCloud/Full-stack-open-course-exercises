import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handler }) => {
	return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ type, amount }) => {
	return (
		<tr>
			<td>{type}: </td>
			<td>{amount}</td>
		</tr>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	function feedbackHandler(state, setter) {
		return () => setter(state + 1);
	}

	const statsTable = (good, neutral, bad) => {
		const all = good + neutral + bad;
		const average = (good - bad) / all;
		const positive = (good / all) * 100;

		return (
			<table>
				<Statistics type={'Good'} amount={good} />
				<Statistics type={'Neutral'} amount={neutral} />
				<Statistics type={'Bad'} amount={bad} />
				<tr>
					<td>All: </td>
					<td>{all}</td>
				</tr>
				<tr>
					<td>Average: </td>
					<td>{average}</td>
				</tr>
				<tr>
					<td>Positive: </td>
					<td>{positive}%</td>
				</tr>
			</table>
		);
	};

	return (
		<div>
			<h1>Would you like to provide a feedback?</h1>
			<Button text={'good'} handler={feedbackHandler(good, setGood)} />
			<Button text={'neutral'} handler={feedbackHandler(neutral, setNeutral)} />
			<Button text={'bad'} handler={feedbackHandler(bad, setBad)} />
			<br />
			<h2>Statistics:</h2>
			{good + neutral + bad
				? statsTable(good, neutral, bad)
				: 'No feedback is recieved'}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
