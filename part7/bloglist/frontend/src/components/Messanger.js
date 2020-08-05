import React from 'react'
import { useSelector } from 'react-redux'

const Messanger = () => {
	const notification = useSelector(state => state.notification)

	let tailwindClasses

	if (notification.status === 'inactive') {
		return null
	} else if (notification.status === 'success') {
		tailwindClasses = 'text-green-700 border-green-700'
	} else if (notification.status === 'error') {
		tailwindClasses = 'text-red-700 border-red-700'
	}

	return (
		<div
			className={
				tailwindClasses +
				' text-center my-4 p-6 bg-gray-300 text-4xl text-gr rounded-lg border-4'
			}
		>
			{notification.message}
		</div>
	)
}

export default Messanger
