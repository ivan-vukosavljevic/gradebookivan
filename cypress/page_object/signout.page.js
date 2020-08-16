export default class Signout {

get signout() {
  return cy.get('.nav-link').contains('Sign out')
}

get url() {
  return cy.url()
}

get btn() {
  return cy.get('.btn').contains('Login')
}

action(){
  this.signout.click()
  this.url.should('include', '/login')
  this.btn.should('be.visible')
}

}

export const signout = new Signout()