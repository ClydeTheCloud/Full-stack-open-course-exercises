import React, { useState, useEffect } from 'react';

import './index.css';
import phonebook from './services/phonebook';
import Filter from './components/Filter';
import Form from './components/Form';
import Names from './components/Names';
import Messanger from './components/Messanger';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState({ message: '', state: 'inactive' });

	function messageUpdater(message, state) {
		setMessage({ message, state });
		setTimeout(() => {
			setMessage({ message: '', state: 'inactive' });
		}, 5000);
	}

	useEffect(() => {
		getEntries();
	}, []);

	const getEntries = () => {
		phonebook.get().then(response => {
			setPersons(response.data);
		});
	};

	const addEntry = event => {
		event.preventDefault();
		if (persons.some(person => person.name === newName)) {
			if (
				window.confirm(
					`${newName} already on the list. Do you want to update phone number?`
				)
			) {
				const updatedEntry = {
					...persons.find(person => person.name === newName),
					number: newNumber,
				};
				phonebook
					.update(updatedEntry.id, updatedEntry)
					.then(response => {
						setPersons(
							persons.map(person =>
								person.id === response.data.id
									? updatedEntry
									: person
							)
						);
					})
					.catch(error => {
						console.log(error);
						messageUpdater(
							`Updating contact ${newName} failed. It seems like contact was already removed from the server.`,
							'error'
						);
						setNewName('');
						setNewNumber('');
						getEntries();
					});
				messageUpdater(`Number updated for ${newName}.`, 'success');
				setNewName('');
				setNewNumber('');
				return;
			} else {
				return;
			}
		}
		const newEntry = { name: newName, number: newNumber };
		phonebook.create(newEntry).then(response => {
			setPersons(persons.concat(response.data));
			messageUpdater(`Contact "${newName}" was added.`, 'success');
			setNewName('');
			setNewNumber('');
		});
	};

	const removeEntry = person => {
		if (
			window.confirm(
				`Are you sure you want to delete ${person.name} from your phonebook?`
			)
		) {
			phonebook.remove(person.id).then(() => getEntries());
		}
	};

	const handleNameInput = event => {
		setNewName(event.target.value);
	};

	const handleNumberInput = event => {
		setNewNumber(event.target.value);
	};

	const handleFilterInput = event => {
		setFilter(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handleFilterInput={handleFilterInput} filter={filter} />
			<br />
			<Messanger message={message.message} state={message.state} />
			<Form
				addEntry={addEntry}
				handleNameInput={handleNameInput}
				newName={newName}
				handleNumberInput={handleNumberInput}
				newNumber={newNumber}
			/>
			<h2>Numbers</h2>
			<Names persons={persons} filter={filter} remove={removeEntry} />
		</div>
	);
};

export default App;
