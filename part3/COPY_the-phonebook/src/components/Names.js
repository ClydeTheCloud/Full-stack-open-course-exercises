import React from 'react';

function Names(props) {
	const filtering = props.persons.filter(person =>
		person.name.toLowerCase().includes(props.filter.toLowerCase())
	);

	const filterResults = filtering.map(person => (
		<div key={person.name}>
			{person.name}: {person.number}{' '}
			<button
				onClick={() => {
					props.remove(person);
				}}
			>
				delete
			</button>
		</div>
	));

	const filterResultCheck = () => {
		if (filterResults.length > 0) {
			return filterResults;
		}
		return <div>Nothing to display. Adjust filter settings.</div>;
	};

	return filterResultCheck();
}

export default Names;
