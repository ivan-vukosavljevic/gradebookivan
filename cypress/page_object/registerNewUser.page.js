export default class RegisterNewUser {

get name() {
  return cy.get('#firstName')
}

get lastName() {
  return cy.get('#lastName')
}

get password() {
  return cy.get('#password')
}

get passwordConfirmation() {
  return cy.get('#passwordConfirmation')
}

get email() {
  return cy.get('#email')
}

get submitButton() {
  return cy.get('button[type="submit"]').contains('Submit')
}

create(name, lastName, password, passwordConfirmation, email){
  this.name.type(name)
  this.lastName.type(lastName)
  this.password.type(password)
  this.passwordConfirmation.type(passwordConfirmation)
  this.email.type(email)
  this.submitButton.click()
}


}

export const registerNewUser = new RegisterNewUser()