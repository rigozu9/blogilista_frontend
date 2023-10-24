describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const testuser = {
      name: 'Test Man',
      username: 'testman',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', testuser)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('wronginput')
      cy.get('#password').type('wronginput')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })
    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog By Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('create').click()
      cy.contains('a new blog Blog By Cypress by Cypress added')
      cy.contains('Blog By Cypress by Cypress')
    })
    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog By Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('create').click()
      cy.contains('a new blog Blog By Cypress by Cypress added')
      cy.contains('Blog By Cypress by Cypress')
      cy.contains('View More').click()
      cy.contains('like').click()
    })
  })
  describe('when logged in and new blog created', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog By Cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#create-button').click()
      cy.contains('create').click()
      cy.contains('a new blog Blog By Cypress by Cypress added')
      cy.contains('Blog By Cypress by Cypress')
    })
    it('A blog can be deleted if logged in acc created it', function() {
      cy.contains('View More').click()
      cy.contains('REMOVE').click()
      cy.contains('blog deleted succesfully!')
    })
    it('Remove button not seen if not creator logged in', function() {
      cy.contains('logout').click()
      cy.contains('log in').click()
      cy.get('#username').type('testman')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('View More').click()
      cy.contains('REMOVE').should('not.exist')
    })
  })
})