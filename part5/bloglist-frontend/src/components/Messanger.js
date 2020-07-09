import React from 'react';
import './Messanger.css';

const Messanger = ({ message, state }) => {
	if (state === 'inactive') {
		return null;
	}

	return <div className={'message ' + state}>{message}</div>;
};

export default Messanger;
