// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('signup', (user) => {
  cy.visit('/signup')
  cy.get('[placeholder="Username"]').type(user.username)
  cy.get('[placeholder="Email"]').type(user.email)
  cy.get('[placeholder="Password"]').type(user.password)
  cy.get('.sc-gKXOVf').click()
  cy.wait(500)
})

Cypress.Commands.add('signin', (user) => {
  cy.visit('/signin')
  cy.get('[placeholder="Email"]').type(user.email)
  cy.get('[placeholder="Password"]').type(user.password)
  cy.get('.sc-gKXOVf').click()
  cy.wait(500)
})