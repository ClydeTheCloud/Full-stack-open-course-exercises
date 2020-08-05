import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { blogLike, blogRemove } from '../reducers/blogReducer'
import CommentSection from './BlogCommentSection'

function BlogPage({ blog }) {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	if (!blog) {
		return <div>Loading...</div>
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

	const deleteRender = () => {
		if (blog.creator.login === user.login) {
			return (
				<button
					className={
						'delete-button btn hover:bg-red-700 bg-white hover:text-white text-red-700'
					}
					onClick={() => {
						deleteBlog(blog)
					}}
				>
					delete
				</button>
			)
		}
	}

	return (
		<div className="blog">
			<h3 className="font-bold text-center text-3xl my-6">
				{blog.title}
			</h3>
			<div className="py-16 px-6 mb-16 bg-gray-300 flex justify-between rounded-md">
				<div>
					{blog.likes} likes&nbsp;
					<button
						className="like-button btn ml-3 bg-blue-800 text-white hover:bg-purple-600"
						onClick={() => {
							likeBlog(blog)
						}}
					>
						Like
					</button>
				</div>
				<div className="flex items-center">
					<a
						className="text-blue-700 font-semibold hover:underline italic hover:text-blue-900"
						href={blog.url}
					>
						Check it out!
					</a>
				</div>
				<div className="flex items-center">
					<p>Written by&nbsp;</p>
					<span className="italic font-semibold text-purple-700">
						{blog.author}
					</span>
				</div>
				<div className="flex items-center">
					<p>Added by&nbsp;</p>
					<span className="italic font-semibold text-purple-700">
						{blog.creator.displayName}
					</span>
				</div>
				{deleteRender()}
			</div>
			<hr />
			<CommentSection blog={blog} />
		</div>
	)
}

export default BlogPage
