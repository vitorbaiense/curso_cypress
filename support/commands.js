Cypress.Commands.add('login', (email, password) => {
    cy.get('[data-test="input-loginEmail"]').type(email);
    cy.get('[data-test="input-loginPassword"]').type(password);
    cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add('cadastrar', (nome, email, password) => {
    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirm_password"]').type(password);
    cy.contains('button', 'Cadastrar').click();
});

Cypress.Commands.add('login_webpdv', () => {
    cy.visit('http://msap-integrado.qa.simonettidev.com.br/webpdv/index.php?f_bln_sair=1');
    cy.get('input[name="usuario"]').type('siderlane');
    cy.get('input[name="senha"]').type('Simonetti@123');
    cy.get('input[name="submit"]').click();

});


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