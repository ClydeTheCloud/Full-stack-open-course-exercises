import React, { useRef } from 'react';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const Blog = ({ blog }) => (
	<div>
		{blog.title} {blog.author}
	</div>
);

const BlogsComponent = ({ user, setUser, messageUpdater, blogs, setBlogs }) => {
	const noteFormRef = useRef();

	const handleLogOut = () => {
		setUser(null);
		window.localStorage.removeItem('blogUser');
	};

	const toggle = () => {
		noteFormRef.current.toggleVisibility();
	};

	return (
		<>
			<h3>Logged in as {user.displayName}</h3>
			{/* <br /> */}
			<button onClick={handleLogOut}>Log Out</button>
			<hr />
			<Togglable
				openLabel="Add new blog"
				closeLabel="cancel"
				ref={noteFormRef}
			>
				<AddBlogForm
					toggleVisibility={toggle}
					messageUpdater={messageUpdater}
					blogs={blogs}
					setBlogs={setBlogs}
				/>
			</Togglable>
			<hr />
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</>
	);
};

export default BlogsComponent;
