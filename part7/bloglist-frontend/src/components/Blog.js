import React, { useState } from 'react'

import { blogLike, blogRemove } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
	const [blogVisibility, setBlogVisibility] = useState(false)

	const blogVisibilityHandler = () => {
		setBlogVisibility(!blogVisibility)
	}

	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const style = {
		flex: {
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
		},
		appearance: {
			backgroundColor: '#eee',
			borderRadius: 5,
			border: '#bbb solid 1px',
			maxWidth: 600,
			padding: 10,
			margin: 5,
		},
	}

	const likeBlog = blog => {
		dispatch(blogLike(blog))
	}

	const deleteBlog = blog => {
		if (
			window.confirm(
				`Are you sure you want to delete ${blog.title} by ${blog.author}?`
			)
		) {
			dispatch(blogRemove(blog))
		}
	}

	const buttonRender = () => (
		<button onClick={blogVisibilityHandler} className='show-and-hide'>
			{blogVisibility ? 'Hide' : 'Show'} blog info.
		</button>
	)

	const deleteRender = () => {
		if (blog.creator.login === user.login) {
			return (
				<button
					className={'delete-button'}
					style={{ color: 'white', backgroundColor: 'red' }}
					onClick={() => {
						deleteBlog(blog)
					}}>
					delete
				</button>
			)
		}
	}

	const showInfo = () => (
		<>
			URL: {blog.url}
			<br />
			Likes: {blog.likes}{' '}
			<button
				className={'like-button'}
				onClick={() => {
					likeBlog(blog)
				}}>
				Like
			</button>
			<br />
			Added by: {blog.creator.displayName}
			<br />
			{deleteRender()}
		</>
	)

	return (
		<div style={style.appearance} className='blog'>
			<div style={style.flex}>
				{blog.title} by: {blog.author}. {buttonRender()}
			</div>
			{blogVisibility ? showInfo() : null}
		</div>
	)
}

export default Blog
