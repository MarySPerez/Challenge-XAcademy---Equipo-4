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

Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="email"]').type(email);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add('registrar', (nombre, apellido, fecha_nacimiento, direccion, postcode, ciudad, estado, pais, telefono, email, pass) => {
    cy.get('[data-test="nav-sign-in"]').click();
    cy.get('[data-test="register-link"]').click();
    cy.get('[data-test="first-name"]').type(nombre);
    cy.get('[data-test="last-name"]').type(apellido);
    cy.get('[data-test="dob"]').type(fecha_nacimiento);
    cy.get('[data-test="address"]').type(direccion);
    cy.get('[data-test="postcode"]').type(postcode);
    cy.get('[data-test="city"]').type(ciudad);
    cy.get('[data-test="state"]').type(estado);
    cy.get('[data-test="country"]').select(pais);
    cy.get('[data-test="phone"]').type(telefono);
    cy.get('[data-test="email"]').type(email);
    cy.get('[data-test="password"]').type(pass);
    cy.get('[data-test="register-submit"]').click();
});

