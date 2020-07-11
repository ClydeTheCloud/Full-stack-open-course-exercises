import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
	const [blogVisibility, setBlogVisibility] = useState(false);

	const blogVisibilityHandler = () => {
		setBlogVisibility(!blogVisibility);
	};

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
	};

	const buttonRender = () => (
		<button onClick={blogVisibilityHandler} className="show-and-hide">
			{blogVisibility ? 'Hide' : 'Show'} blog info.
		</button>
	);

	const deleteRender = () => {
		if (blog.creator.login === user.login) {
			return (
				<button
					style={{ color: 'white', backgroundColor: 'red' }}
					onClick={() => {
						deleteBlog(blog);
					}}
				>
					delete
				</button>
			);
		}
	};

	const showInfo = () => (
		<>
			URL: {blog.url}
			<br />
			Likes: {blog.likes}{' '}
			<button
				onClick={() => {
					likeBlog(blog);
				}}
			>
				Like
			</button>
			<br />
			Added by: {blog.creator.displayName}
			<br />
			{deleteRender()}
		</>
	);

	return (
		<div style={style.appearance} className="blog">
			<div style={style.flex}>
				{blog.title} by: {blog.author}. {buttonRender()}
			</div>
			{blogVisibility ? showInfo() : null}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	likeBlog: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
