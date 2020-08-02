import React from 'react'
import { useSelector } from 'react-redux'
import './Messanger.css'

const Messanger = () => {
	const notification = useSelector(state => state.notification)

	if (notification.status === 'inactive') {
		return null
	}

	return (
		<div className={'message ' + notification.status}>
			{notification.message}
		</div>
	)
}

export default Messanger
