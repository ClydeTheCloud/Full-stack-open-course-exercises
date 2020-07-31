import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const PLACEHOLDER_FN = () => {}
const PLACEHOLDER_OBJ = {}

test('Part of info rendered', () => {
	const blog = {
		title: 'test title',
		author: 'test author',
		likes: 0,
		url: 'http://test.url.com/blog/1',
	}

	const component = render(
		<Blog
			blog={blog}
			likeBlog={PLACEHOLDER_FN}
			user={PLACEHOLDER_OBJ}
			deleteBlog={PLACEHOLDER_FN}
		/>
	)

	expect(component.container).toHaveTextContent('test title')
	expect(component.container).toHaveTextContent('test author')
	expect(component.container).not.toHaveTextContent(
		'http://test.url.com/blog/1'
	)
	expect(component.container).not.toHaveTextContent(0)
})

test('Full info shown on button click', () => {
	const blog = {
		title: 'test title',
		author: 'test author',
		likes: 0,
		url: 'http://test.url.com/blog/1',
		creator: {
			login: 'testlogin',
			displayName: 'test name',
		},
	}

	const user = { login: 'userlogin' }

	const component = render(
		<Blog
			blog={blog}
			user={user}
			likeBlog={PLACEHOLDER_FN}
			deleteBlog={PLACEHOLDER_FN}
		/>
	)

	const btn = component.container.querySelector('.show-and-hide')

	fireEvent.click(btn)

	expect(component.container).toHaveTextContent('test title')
	expect(component.container).toHaveTextContent('test author')
	expect(component.container).toHaveTextContent('http://test.url.com/blog/1')
	expect(component.container).toHaveTextContent(0)
})

test('Like button can be clicked two times', () => {
	const blog = {
		title: 'test title',
		author: 'test author',
		likes: 0,
		url: 'http://test.url.com/blog/1',
		creator: {
			login: 'testlogin',
			displayName: 'test name',
		},
	}

	const user = { login: 'userlogin' }

	const mockLike = jest.fn()

	const component = render(
		<Blog
			blog={blog}
			user={user}
			likeBlog={mockLike}
			deleteBlog={PLACEHOLDER_FN}
		/>
	)

	const btn = component.container.querySelector('.show-and-hide')

	fireEvent.click(btn)

	const likeBtn = component.getByText('Like')

	fireEvent.click(likeBtn)
	fireEvent.click(likeBtn)

	expect(mockLike.mock.calls).toHaveLength(2)
})
