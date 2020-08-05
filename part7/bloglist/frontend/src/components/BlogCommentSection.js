import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { comment } from '../reducers/blogReducer'

function CommentSection({ blog }) {
	const [newComment, setNewComment] = useState('')
	const dispatch = useDispatch()

	const comments = () => {
		if (!blog.comments) {
			return null
		}
		return (
			<ul className="container mx-auto">
				{blog.comments.map((c, index) => (
					<li
						className="list-disc list-inside px-6 py-3 my-1 even:bg-gray-200 italic"
						key={index}
					>
						{c}
					</li>
				))}
			</ul>
		)
	}

	const handler = e => {
		e.preventDefault()
		dispatch(comment(blog, newComment))
		setNewComment('')
	}

	return (
		<div>
			<div className="mx-6">
				<p className="text-center my-3 text-xl mb-6">New comment:</p>
				<div className="flex flex-no-wrap">
					<div className="flex-grow">
						<input
							className="p-1 border rounded border-purple-800 w-full text-black h-10"
							type="text"
							value={newComment}
							onChange={e => {
								setNewComment(e.target.value)
							}}
						></input>
					</div>
					<button
						className="btn bg-blue-800 ml-6 text-white hover:bg-purple-600"
						onClick={handler}
					>
						Post Comment
					</button>
				</div>
			</div>
			<hr />
			{comments()}
		</div>
	)
}

export default CommentSection
