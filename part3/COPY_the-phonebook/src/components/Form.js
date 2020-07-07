import React from 'react';

function Form(props) {
	return (
		<form onSubmit={props.addEntry}>
			<div>
				name: <input onChange={props.handleNameInput} value={props.newName} />
			</div>
			<div>
				number:{' '}
				<input onChange={props.handleNumberInput} value={props.newNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

export default Form;
