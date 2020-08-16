import {EMAIL} from '../fixtures/constants';
import {NAME} from '../fixtures/constants';
import { randomEmail } from '../utils';



const faker = require('faker');
var firstNameF = faker.name.findName();
var lastNameF = faker.name.findName();
let emailf = faker.internet.email();
let password = faker.internet.password();
let url1 = "https://gradebook.vivifyideas.com/register";


describe('Register module', () => {

  beforeEach (() => {
    cy.visit('/')
  })
  // before(() => {
  //   cy.server()
  //       cy.route('https://gradebook-api.vivifyideas.com/api/login').as('galleries')
  // })

  it('G0200 Gradebook Register', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(NAME.EXISTING)
    cy.get('#lastName').type(NAME.EXISTING)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(EMAIL.EXISTING)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.url().should('include', '/gradebooks')
  })

  it('G0201 Gradebook Register - New user with exactly same data like existing user', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(NAME.EXISTING)
    cy.get('#lastName').type(NAME.EXISTING)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(EMAIL.EXISTING)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.server()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('gradebook')
        cy.wait('@gradebook')
    cy.url().should('eq', url1)
    cy.url().should('include', '/register')
    cy.get('.nav-link').contains('Create Gradebook').should('not.be.visible')    
  })

  it('G0202 Gradebook Register - Create new user without First Name', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    // cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#firstName').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  })    
    cy.url().should('include', '/register')
  })

  it('G0203 Gradebook Register - Create new user without Last Name', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    // cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#lastName').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  })    
    cy.url().should('include', '/register')
  })
   
  it('G0204 Gradebook Register - Create new user without Password', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    // cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Your passwords doesn`t match, try again, please')
    })  
    cy.url().should('include', '/register')
  })

  it('G0205 Gradebook Register - Create new user without Password Confirmation', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    // cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Your passwords doesn`t match, try again, please')
    })
    cy.url().should('include', '/register')
  })

  it('G0206 Gradebook Register - Create new user without Password and Password Confirmation', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    //cy.get('#password').type(EMAIL.PASSWORD)
    // cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  }) 
    cy.url().should('include', '/register')
  })

  it('G0207 Gradebook Register - Create new user without Email', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    // cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill in this field.')
  }) 
    cy.url().should('include', '/register')
  })

  it('G0208 Gradebook Register - Create new user without checked Accept terms and conditions box', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible').click()
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.wait(1000)
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Your registration cannot be completed. Check Accept terms and conditions')
    })
    cy.get('#termsAndConditions').then(($input) => {
      expect($input[0].validationMessage).to.eq('Your registration cannot be completed. Check Accept terms and conditions')
    })
    cy.url().should('include', '/register')
  })

  it('G0209 Gradebook Register - Create new user with 255 symbol Firs Name and Last Name', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type('Phasellus aliquet tempor leo et fermentum. Aenean faucibus sem vitae erat lacinia vestibulum. Duis varius ac ante eu fermentum. Pellentesque aliquet iaculis nibh, quis ullamcorper ex vulputate vel. Sed eget leo suscipit, venenatis tortor vel, congue eget.')
    cy.get('#lastName').type('Phasellus aliquet tempor leo et fermentum. Aenean faucibus sem vitae erat lacinia vestibulum. Duis varius ac ante eu fermentum. Pellentesque aliquet iaculis nibh, quis ullamcorper ex vulputate vel. Sed eget leo suscipit, venenatis tortor vel, congue eget.')
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.url().should('include', '/gradebooks')
  })
  
  it('G0209_1 Gradebook Register - Create new user with 256 symbol Firs Name and Last Name', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type('Quisque quis cursus libero, eu ornare velit. Nam et ultricies nisl. In vel metus lacinia, ultrices libero eget, luctus enim. Nullam sit amet commodo dui. Duis vel porttitor elit. Pellentesque in turpis eu libero consequat lobortis. Donec tellus dolor quis.')
    cy.get('#lastName').type('Quisque quis cursus libero, eu ornare velit. Nam et ultricies nisl. In vel metus lacinia, ultrices libero eget, luctus enim. Nullam sit amet commodo dui. Duis vel porttitor elit. Pellentesque in turpis eu libero consequat lobortis. Donec tellus dolor quis.')
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Your registration cannot be completed. First name and Last Name contains over 255 symbol.')
    })
    cy.get('#termsAndConditions').then(($input) => {
      expect($input[0].validationMessage).to.eq('Your registration cannot be completed. First name and Last Name contains over 255 symbol.')
    })
    cy.url().should('include', '/register')
  })

  it('G0210 Gradebook Register - Create new user Password without uppercase letter', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type('sifra123')
    cy.get('#passwordConfirmation').type('sifra123')
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please match the format requested.')
    })
    cy.url().should('include', '/register')
  })

  it('G0211 Gradebook Register - Create new user Password without lowercase letter', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type('SIFRA123')
    cy.get('#passwordConfirmation').type('SIFRA123')
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please match the format requested.')
    })
    cy.url().should('include', '/register')
  })

  it('G0212 Gradebook Register - Create new user Password without number', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type('Sifratri')
    cy.get('#passwordConfirmation').type('Sifratri')
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please match the format requested.')
    })
    cy.url().should('include', '/register')
  })

  it('G0213 Gradebook Register - Create new user Password with 7 characters', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type('Sifra12')
    cy.get('#passwordConfirmation').type('Sifra12')
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please match the format requested.')
    })
    cy.url().should('include', '/register')
  })
  
  it('G0214 Gradebook Register - Create new user Password with 8 characters', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.url().should('include', '/gradebooks')
  })

  it('G0215 Gradebook Register - Create new user Password with 9 characters - front fail - back pass', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type('Sifra1234')
    cy.get('#passwordConfirmation').type('Sifra1234')
    cy.get('#email').type(emailf)
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.server()
        cy.route(Cypress.env('apiUrl') + 'diaries?page=1').as('gradebook')
        cy.wait('@gradebook')
    cy.url().should('include', '/gradebooks')
  })

  it('G0216 Gradebook Register - Create new user Email without @', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type('ivanemailgmail.com')
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'ivanemailgmail.com\' is missing an \'@\'.')
    })
    cy.url().should('include', '/register')
  })

  it('G0217 Gradebook Register - Create new user Email with two @', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type('ivanemail@g@mail.com')
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq(`A part following '@' should not contain the symbol '@'.`)
    })
    cy.url().should('include', '/register')
  })

  it('G0218 Gradebook Register - Create new user Email without dot', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type('ivanemail@gmailcom')
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq('Email address is invalid')
    })
    cy.url().should('include', '/register')
  })

  it('G0219 Gradebook Register - Create new user Email without name before @', () => {
    cy.url().should('include', '/login')
    cy.get('.nav-link').contains('Register').click()
    cy.get('#firstName').type(firstNameF)
    cy.get('#lastName').type(lastNameF)
    cy.get('#password').type(EMAIL.PASSWORD)
    cy.get('#passwordConfirmation').type(EMAIL.PASSWORD)
    cy.get('#email').type('@gmail.com')
    cy.get('[for="termsAndConditions"]').contains('Accept terms and conditions').should('be.visible')
    cy.get('#termsAndConditions').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq(`Please enter a part followed by '@'. '@gmail.com' is incomplete.`)
    })
    cy.url().should('include', '/register')
  })
})