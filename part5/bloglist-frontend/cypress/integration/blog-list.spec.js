describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/test/reset')
		const testUser = {
			login: 'Tester',
			password: '111',
			displayName: 'Tester Name',
		}
		cy.request('POST', 'http://localhost:3001/api/users/', testUser)
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Blogs')
		cy.contains('Please, log in:')
		cy.contains('Login')
	})

	describe('Login', function () {
		it('Login with wrong credentials - error is shown', function () {
			cy.get('#login').type('NOTrealUSER')
			cy.get('#password').type('1513512523')
			cy.get('#login-button').click()

			cy.get('.message')
				.should('have.class', 'error')
				.should('have.css', 'color')
				.and('match', /rgb\(255, 0, 0\)/)
			cy.contains('Wrong login or password')
		})

		it('Login with right credentials', function () {
			cy.get('#login').type('Tester')
			cy.get('#password').type('111')
			cy.get('#login-button').click()

			cy.contains('Logged in as Tester Name')
		})
	})

	describe('When logged in', function () {
		beforeEach(function () {
			cy.get('#login').type('Tester')
			cy.get('#password').type('111')
			cy.get('#login-button').click()
		})

		it('Creating new blog', function () {
			cy.get('.blog').should('not.exist')

			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Test Title')
			cy.get('#author-input').type('Test Author')
			cy.get('#url-input').type('Test URL')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Test Title"')

			cy.get('.blog').contains('Test Title by: Test Author.')
		})

		it('Liking a blog', function () {
			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Like')
			cy.get('#author-input').type('This')
			cy.get('#url-input').type('Blog')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Like"')

			cy.contains('Show blog info').click()
			cy.contains('Likes: 0')
			cy.get('.like-button').click()

			cy.contains('Likes: 1')
		})

		it('User can delete blog', function () {
			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Delete')
			cy.get('#author-input').type('This')
			cy.get('#url-input').type('Blog')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Delete"')

			cy.contains('Show blog info').click()
			cy.get('.delete-button').click()

			cy.get('.blog').should('not.exist')
		})

		it('Unathorized user cant delete blog', function () {
			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Cant')
			cy.get('#author-input').type('Touch')
			cy.get('#url-input').type('Dis')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Cant"')

			cy.get('#logout-button').click()

			const testUser2 = {
				login: 'Tester2',
				password: '111',
				displayName: 'Tester2 Name',
			}
			cy.request('POST', 'http://localhost:3001/api/users/', testUser2)

			cy.get('#login').type('Tester2')
			cy.get('#password').type('111')
			cy.get('#login-button').click()

			cy.contains('Show blog info').click()
			cy.get('.delete-button').should('not.exist')
		})

		it('Blogs are sorted by number of likes', function () {
			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Zero likes')
			cy.get('#author-input').type('should be')
			cy.get('#url-input').type('here')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Zero likes"')

			cy.contains('Add new blog').click()
			cy.get('#title-input').type('One like')
			cy.get('#author-input').type('should be')
			cy.get('#url-input').type('here')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "One like"')

			cy.contains('Add new blog').click()
			cy.get('#title-input').type('Two likes')
			cy.get('#author-input').type('should be')
			cy.get('#url-input').type('here')
			cy.get('#create-button').click()
			cy.contains('Created blog entry "Two likes"')

			cy.get('.blog')
				.contains('One like')
				.contains('Show blog info')
				.click()
			cy.get('.like-button').click()
			cy.contains('Hide blog info').click()

			cy.get('.blog')
				.contains('Two likes')
				.contains('Show blog info')
				.click()
			cy.get('.like-button').click()
			cy.contains('Likes: 1')
			cy.get('.like-button').click()
			cy.contains('Hide blog info').click()

			cy.get('.blog').as('blogs')

			cy.get('@blogs').should('have.length', 3)
			cy.get('@blogs')
				.each(blog => {
					cy.get(blog).contains('Show blog info').click()
				})
				.then(blogs => {
					cy.get(blogs[0]).contains('Likes: 2')
					cy.get(blogs[1]).contains('Likes: 1')
					cy.get(blogs[2]).contains('Likes: 0')
				})
		})
	})
})
