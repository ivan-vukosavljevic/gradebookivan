import {Login, login} from '../page_object/login.page'
import {EMAIL} from '../fixtures/constants';
import {NAME} from '../fixtures/constants';
import { randomEmail } from '../utils';
import { isEmpty } from 'lodash';



const faker = require('faker');
var firstNameF = faker.name.findName();
var lastNameF = faker.name.findName();
let emailf = faker.internet.email();
let password = faker.internet.password();
let url1 = "https://gradebook.vivifyideas.com/register";


describe('Login module', () => {

  beforeEach (() => {
    cy.visit('/')
  })
  // before(() => {
  //   cy.server()
  //       cy.route('https://gradebook-api.vivifyideas.com/api/login').as('galleries')
  // })

  it('G0400 Gradebook Login valid data', () => {
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').should('be.visible').type(EMAIL.EXISTING)
    cy.get('input[type="password"]').should('be.visible').type(EMAIL.PASSWORD)
    cy.get('.btn').contains('Login').should('be.visible').click()
    cy.server()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('gradebook')
        cy.wait('@gradebook')
    cy.url().should('include', '/gradebooks')
    cy.get('.nav-link').contains('My Gradebook').should('be.visible')
  })

  it('G0401 Gradebook Login without email and password', () => {
    cy.url().should('include', '/login')
    cy.get('.btn').contains('Login').should('be.visible').click()
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  })   
  })

  it('G0402 Gradebook Login with valid mail and without password', () => {
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').should('be.visible').type(EMAIL.EXISTING)
    cy.get('input[type="password"]').should('be.visible')
    cy.get('.btn').contains('Login').should('be.visible').click()
    cy.url().should('include', '/login')
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  })   
  })

  it('G0403 Gradebook Login valid password and without email', () => {
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible').type(EMAIL.PASSWORD)
    cy.get('.btn').contains('Login').should('be.visible').click()
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  })   
  })

  it('G0404 Gradebook Login valid email and invalid password', () => {
    cy.url().should('include', '/login')
    login.login(EMAIL.EXISTING, 'Sifra789')
    cy.url().should('include', '/login')
    cy.get('input[type="password"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Password is incorect')
  })   
  })

  it('G0405 Gradebook Login valid password and invalid email', () => {
    cy.url().should('include', '/login')
    login.login('badmail@gmail.com', EMAIL.PASSWORD)
    cy.url().should('include', '/login')
    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Email is incorect')
  })   
  })
})