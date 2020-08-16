import { registerNewUser } from '../page_object/registerNewUser.page';
import { signout } from '../page_object/signout.page';
import {EMAIL} from '../fixtures/constants';
import {NAME} from '../fixtures/constants';

const faker = require('faker');
var firstNameF = faker.name.findName();
var lastNameF = faker.name.findName();
let emailf = faker.internet.email();
let password = faker.internet.password();
let url1 = "https://gradebook.vivifyideas.com/register";


describe('Sign out module', () => {

  beforeEach (() => {
    cy.visit('/')
    cy.get('.nav-link').contains('Register').click()
  })
  // before(() => {
  //   cy.server()
  //       cy.route('https://gradebook-api.vivifyideas.com/api/login').as('galleries')
  // })

  it('G0300 Gradebook Sign out', () => {
    registerNewUser.create(firstNameF, lastNameF, EMAIL.PASSWORD, EMAIL.PASSWORD, emailf)
    cy.server()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('gradebook')
        cy.wait('@gradebook')
    cy.get('.nav-link').contains('Sign out').click()
    cy.url().should('include', '/login')
    cy.get('.btn').contains('Login').should('be.visible')
  })

  it('G0301 Gradebook Sign out - Type direct url after signout', () => {
    registerNewUser.create(firstNameF, lastNameF, EMAIL.PASSWORD, EMAIL.PASSWORD, emailf)
    cy.server()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('gradebook')
        cy.wait('@gradebook')
    signout.action()
    cy.visit('https://gradebook.vivifyideas.com/gradebooks', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/gradebooks#', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/my-gradebook/95', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/create-gradebook', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/create-gradebook#', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/all-professors', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
    cy.visit('https://gradebook.vivifyideas.com/create-professor', {failOnStatusCode: false})
    cy.get('h1').contains('404 Not Found')
  })

})