import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CountryComponent from './CountryComponent';

function App() {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);

	function searchHandler(event) {
		setSearch(event.target.value);
	}

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			setCountries(response.data);
			// console.log(countries);
		});
	}, []);

	const searchResults = countries.filter(country =>
		country.name.toLowerCase().includes(search.toLowerCase())
	);
	const renderSearchResults = searchResults.map(country => (
		<div key={country.name}>
			{country.name}
			<button
				onClick={() => {
					setSearch(country.name);
				}}
			>
				show
			</button>
		</div>
	));

	const displayConditions = () => {
		if (!search) {
			return <div>Enter search request</div>;
		} else if (searchResults.length > 11) {
			return <div>Too many results. Specify search conditions.</div>;
		} else if (searchResults.length === 1) {
			// console.log(searchResults[0]);
			return <CountryComponent country={searchResults[0]} />;
		} else {
			return renderSearchResults;
		}
	};

	return (
		<div>
			<p>find countries: </p>{' '}
			<input onChange={searchHandler} value={search}></input>
			{displayConditions()}
		</div>
	);
}

export default App;
