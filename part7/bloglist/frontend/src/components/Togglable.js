import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return { toggleVisibility }
	})

	return (
		<>
			<div className="ml-6" style={hideWhenVisible}>
				<button
					className="btn border border-purple-800 hover:bg-purple-500 hover:border-transparent hover:text-white"
					onClick={toggleVisibility}
				>
					{props.openLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				{/* <button
					className="btn border border-purple-800 "
					onClick={toggleVisibility}
				>
					{props.closeLabel}
				</button> */}
			</div>
		</>
	)
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	openLabel: PropTypes.string.isRequired,
	closeLabel: PropTypes.string.isRequired,
}

export default Togglable
