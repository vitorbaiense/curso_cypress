/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => {
  cy.get("#TB_load").should("be.visible");
  cy.wait(waitRef);
  cy.get("#TB_load").should("not.exist");
});

describe('Fluxo com redirect', () => {
  beforeEach(() => {
    cy.viewport(393, 852);

    
    // // Confirma que foi redirecionado para o OAuth
    // cy.location('origin', { timeout: 20000 })
    //   .should('eq', 'https://oauth.msap-integrado.qa.simonettidev.com.br');

    // Executa login no domínio de OAuth
    cy.visit('https://oauth.msap-integrado.qa.simonettidev.com.br', () => {
      
    });

    cy.get('#username').type('gustavo20');
      cy.get('#password').type('Simonetti@123', { log: false });
      cy.get('button[type="submit"]').click();
      
    // Acessa a página inicial (vai redirecionar para login)
    cy.visit('https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/');
    cy.wait(15000);
  });

  it("Deve permitir login pelo mobile e realizar atendimento com cliente que possui cartão simonetti ativo", () => {
    // cy.intercept("POST", "/app/pedidos/v2/vincular-cliente").as(
    //   "vincularCliente",
    // );

    cy.get('input[id="cpfCnpj"]').type("00082022739");
    cy.get("#formEscolherCliente").submit();

    cy.waitLongLoad("@vincularCliente");

    cy.get("a.btn.btn-success.loading-feedback")
      .contains("Adicionar produto")
      .click();

    cy.intercept("POST", "app/pedidos/v2/produtos/servicos/buscar").as(
      "buscarServicos",
    );

    cy.get('input[id="codigoProduto"]').type("001282");
    cy.get('#form-buscar-produto button[type="submit"]').click();

    cy.get('input[type="radio"]').eq(0).click();

    cy.waitLongLoad("@buscarServicos");

    cy.get('button[id="ir-para-entrega-button"]').click();
    cy.get('input[id="selecionar-todos-itens"]').click();
  });


});