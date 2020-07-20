import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlogForm from './AddBlogForm'

// const PLACEHOLDER_FN = () => {}
// const PLACEHOLDER_OBJ = {}

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
	const handleAddBlogMock = jest.fn()

	const component = render(<AddBlogForm handleAddBlog={handleAddBlogMock} />)

	const form = component.container.querySelector('form')
	const titleInput = component.container.querySelector('#title-input')
	const authorInput = component.container.querySelector('#author-input')
	const urlInput = component.container.querySelector('#url-input')

	fireEvent.change(titleInput, {
		target: { value: 'test title' },
	})
	fireEvent.change(authorInput, {
		target: { value: 'test author' },
	})
	fireEvent.change(urlInput, {
		target: { value: 'test url' },
	})
	fireEvent.submit(form)

	expect(handleAddBlogMock.mock.calls).toHaveLength(1)
	expect(handleAddBlogMock.mock.calls[0][0]).toBe('test title')
	expect(handleAddBlogMock.mock.calls[0][1]).toBe('test author')
	expect(handleAddBlogMock.mock.calls[0][2]).toBe('test url')
})
