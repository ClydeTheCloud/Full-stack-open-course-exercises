import React from 'react';

function Filter(props) {
	return (
		<div>
			filter contacts:{' '}
			<input onChange={props.handleFilterInput} value={props.filter} />
		</div>
	);
}

export default Filter;
