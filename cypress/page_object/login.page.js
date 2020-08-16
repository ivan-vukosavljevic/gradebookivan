export default class Login {

get email() {
  return cy.get('input[name="email"]')
}
get password() {
  return cy.get('input[type="password"]')
}

get loginButton() {
  return cy.get('.btn').contains('Login')
}

login(mail, pass){
  this.email.type(mail)
  this.password.type(pass)
  this.loginButton.click()
}

}

export const login = new Login()