describe('Home page validate', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it.only('G0100 Gradebook Home page', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Sign in').should('be.visible')
    cy.get('.nav-link').contains('Register').should('be.visible')
    cy.get('h2').contains('Please login').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('.btn').contains('Login').should('be.visible')
  })

})