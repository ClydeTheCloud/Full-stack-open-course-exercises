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

			cy.get('.blog').contains('Test Title by: Test Author.')
		})
	})
})
