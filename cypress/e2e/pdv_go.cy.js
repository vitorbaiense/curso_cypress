/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => {
  cy.get("#TB_load").should("be.visible");
  cy.wait(waitRef);
  cy.get("#TB_load").should("not.exist");
});

describe('Fluxo com redirect', () => {
  beforeEach(() => {
    cy.viewport(393, 852);

    // Executa login no domínio de OAuth
    cy.visit('https://oauth.msap-integrado.qa.simonettidev.com.br');
    cy.get('#username').type('gustavo20');
    cy.get('#password').type('Simonetti@123', { log: false });
    cy.get('button[type="submit"]').click();

    // Intercepta a chamada que valida o login no mobile
    cy.intercept('GET', '**/app/pedidos/v2/criar**').as('usuarioLogado');

    // Agora acessa a página inicial
    cy.visit('https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/');

    // Aguarda a API de usuário logado responder
    cy.wait('@usuarioLogado');
  });

  it("Deve permitir login pelo mobile e realizar atendimento com cliente que possui cartão simonetti ativo", () => {
    cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

    cy.get('input[id="cpfCnpj"]').type("00082022739");
    cy.get("#formEscolherCliente").submit();

    cy.waitLongLoad("@vincularCliente");

    cy.get("a.btn.btn-success.loading-feedback")
      .contains("Adicionar produto")
      .click();

    cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

    cy.get('input[id="codigoProduto"]').type("001282");
    cy.get('#form-buscar-produto button[type="submit"]').click();

    cy.get('input[type="radio"]').eq(0).click();

    cy.waitLongLoad("@buscarServicos");

    cy.get('button[id="ir-para-entrega-button"]').click();
    cy.get('input[id="selecionar-todos-itens"]').click();
  });
});
