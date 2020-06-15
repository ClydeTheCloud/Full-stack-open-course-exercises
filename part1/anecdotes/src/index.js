import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const App = props => {
	const [selected, setSelected] = useState(0);

	const [rating, setRating] = useState(new Array(anecdotes.length).fill(0));

	const randomHandler = () => {
		const rand = Math.floor(Math.random() * anecdotes.length);
		setSelected(rand);
	};

	const ratingHandler = () => {
		const newRating = [...rating];
		newRating[selected]++;
		setRating(newRating);
	};

	const mostVoted = Math.max(...rating);

	return (
		<div>
			{props.anecdotes[selected]}
			<br />
			<button onClick={ratingHandler}>Vote</button>
			<button onClick={randomHandler}>Random</button>
			<div>
				<h2>Anecdote of the day is:</h2>
				<p>{anecdotes[rating.indexOf(mostVoted)]}</p>
			</div>
		</div>
	);
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
