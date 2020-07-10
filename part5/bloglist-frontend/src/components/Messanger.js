import React from 'react'
import PropTypes from 'prop-types'
import './Messanger.css'

const Messanger = ({ message, state }) => {
	if (state === 'inactive') {
		return null
	}

	return <div className={'message ' + state}>{message}</div>
}

Messanger.propTypes = {
	message: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
}

export default Messanger
