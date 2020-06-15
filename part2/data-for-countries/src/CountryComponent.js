import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CountryComponent(props) {
	const api_key = process.env.REACT_APP_API_KEY;

	const [weather, setWeather] = useState();

	useEffect(() => {
		axios
			.get(
				`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${props.country.capital}`
			)
			.then(response => {
				setWeather(response.data);
				console.log(weather);
			});
	}, [props.country.capital]);

	const weatherWidget = () => {
		if (weather) {
			return (
				<>
					<h3>Weather in {props.country.capital}:</h3>
					<p>
						<strong>Temperature</strong>: {weather.current.temp_c}{' '}
						Celsius
					</p>
					<p>
						It is <strong>{weather.current.condition.text} </strong>
					</p>
					<img
						alt={weather.current.condition.text}
						style={{ width: '80px', height: 'auto' }}
						src={`http:${weather.current.condition.icon}`}
					/>
					<p>
						Wind: {weather.current.wind_kph}kmph,{' '}
						{weather.current.wind_dir}
					</p>
				</>
			);
		}
		return <h2>Loading weather, please wait</h2>;
	};

	return (
		<div>
			<h1>{props.country.name}</h1>
			<p>Capital: {props.country.capital}</p>
			<p>Population: {props.country.population}</p>
			<h3>Languages:</h3>
			<ul>
				{props.country.languages.map(lang => (
					<li key={lang.name}>{lang.name}</li>
				))}
			</ul>
			<img
				alt={props.country.name}
				style={{ width: '100px', height: 'auto' }}
				src={props.country.flag}
			/>
			{weatherWidget()}
		</div>
	);
}

export default CountryComponent;
