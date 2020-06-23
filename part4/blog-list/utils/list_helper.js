const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, entry) => {
		return sum + entry.likes;
	};

	return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	let favBlog;
	let maxLikes = -1;
	blogs.forEach((blog) => {
		if (blog.likes > maxLikes) {
			favBlog = blog;
			maxLikes = blog.likes;
		}
	});
	return favBlog;
};

const mostBlogs = (blogs) => {
	const listOfAuthors = [];
	blogs.forEach((blog) => {
		if (!listOfAuthors.some((entry) => entry.author === blog.author)) {
			listOfAuthors.push({ author: blog.author, blogs: 1 });
		} else {
			listOfAuthors[
				listOfAuthors.findIndex((entry) => {
					return entry.author === blog.author;
				})
			].blogs += 1;
		}
	});

	let bestAuthor;
	let maxblogs = 0;
	listOfAuthors.forEach((author) => {
		if (author.blogs > maxblogs) {
			bestAuthor = author;
			maxblogs = author.blogs;
		}
	});
	return bestAuthor;
};

const mostLikes = (blogs) => {
	const listOfAuthors = [];
	blogs.forEach((blog) => {
		if (!listOfAuthors.some((entry) => entry.author === blog.author)) {
			listOfAuthors.push({ author: blog.author, likes: blog.likes });
		} else {
			listOfAuthors[
				listOfAuthors.findIndex((entry) => {
					return entry.author === blog.author;
				})
			].likes += blog.likes;
		}
	});

	let favAuthor;
	let maxLikes = -1;
	listOfAuthors.forEach((author) => {
		if (author.likes > maxLikes) {
			favAuthor = author;
			maxLikes = author.likes;
		}
	});
	return favAuthor;
};

module.exports = {
	totalLikes,
	dummy,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
