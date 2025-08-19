/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => { 
  cy.get("#TB_load").should("be.visible"); 
  cy.wait(waitRef); 
  cy.get("#TB_load").should("not.exist"); 
});

describe('Realizar Login', () => {
    before(() => {
        const telefone = cy.gerarTelefone();
    });

    beforeEach(() => {
        // cy.visit('https://cadastro.msap-integrado.qa.simonettidev.com.br/app/login'); //msap
        cy.visit('http://gama.qa.simonettidev.com.br:7002/app/login'); //gama
        cy.get('input[name="username"]').type('gustavo20');
        cy.get('input[name="password"]').type('Simonetti@123', { log: false });
        cy.get('button[type="submit"]').click();

       
    });

    it('Deve Iniciar atendimento sobre cliente com dados incompletos', () => {
         //aguardar chamada de login
        // cy.intercept('GET', '**/app/atendimento**').as('loginAtendimento');
        // cy.wait('@loginAtendimento');

        cy.intercept('POST', '**//biometria/iniciar**').as('retornoTelefone');

        cy.get('input[id="field-:r2:"]').type('11352583763'); // inserir CPF
        cy.get('button').contains('Consultar').click();
        // cy.wait('@consultarCliente');
        cy.get('button').contains('Seguir para atualização').click();

        //tela para preencher telefone do cliente
        cy.gerarTelefone().then((telefone) => {
            cy.get('input[class="chakra-input css-15vqg88"]').type(telefone);
        });

        cy.wait('@retornoTelefone');
    });
});