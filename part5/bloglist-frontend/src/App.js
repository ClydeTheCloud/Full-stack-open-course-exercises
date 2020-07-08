import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Messanger from './components/Messanger';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState({ message: '', state: 'inactive' });

	function messageUpdater(message, state) {
		setMessage({ message, state });
		setTimeout(() => {
			setMessage({ message: '', state: 'inactive' });
		}, 5000);
	}

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, []);

	const handleLogin = async event => {
		event.preventDefault();
		try {
			const user = await loginService.login({ login, password });

			setUser(user);
			setLogin('');
			setPassword('');
		} catch (exception) {
			messageUpdater('Wrong login or password', 'error');
		}
	};

	const loginComponent = () => {
		return (
			<form onSubmit={handleLogin}>
				<label>
					Login:
					<input
						type="text"
						value={login}
						name="Login"
						onChange={event => {
							setLogin(event.target.value);
						}}
					></input>
				</label>
				<br />
				<label>
					Password:
					<input
						type="password"
						value={password}
						name="password"
						onChange={event => {
							setPassword(event.target.value);
						}}
					></input>
				</label>
				<br />
				<button type="submit">login</button>
			</form>
		);
	};

	const blogsComponent = () => {
		return (
			<>
				{blogs.map(blog => (
					<Blog key={blog.id} blog={blog} />
				))}
			</>
		);
	};

	return (
		<div>
			<h2>blogs</h2>
			<Messanger message={message.message} state={message.state} />
			{user === null ? loginComponent() : blogsComponent()}
		</div>
	);
};

export default App;
