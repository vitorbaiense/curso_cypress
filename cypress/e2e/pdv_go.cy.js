/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => { 
  cy.get("#TB_load").should("be.visible"); 
  cy.wait(waitRef); 
  cy.get("#TB_load").should("not.exist"); 
});

describe('Fluxo com redirect', () => {

  let cpfs;

  before(() => {
    cy.fixture("cpf_cartao_simonetti_ativo").then((data) => {
      cpfs = data;
    });
  });

  beforeEach(() => {
    cy.viewport(393, 852);

    // Executa login no domínio de OAuth
    // cy.visit('https://oauth.msap-integrado.qa.simonettidev.com.br'); //msap
    cy.visit('https://mobile.webpdv.gama.qa.simonettidev.com.br/'); //gama
    cy.get('#username').type('gustavo20');
    cy.get('#password').type('Simonetti@123', { log: false });
    cy.get('button[type="submit"]').click();

    // Intercepta a chamada que valida o login no mobile
    cy.intercept('GET', '**/app/pedidos/v2/criar**').as('usuarioLogado');

    // Agora acessa a página inicial
    // cy.visit('https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/'); //msap
    cy.visit('https://mobile.webpdv.gama.qa.simonettidev.com.br/'); //gama

    // Aguarda a API de usuário logado responder
    cy.wait('@usuarioLogado');
  });

  it("Deve permitir login pelo mobile e realizar atendimento com cliente que possui cartão simonetti ativo", () => {
    cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

    cy.get('input[id="cpfCnpj"]').type('15568581754');
    cy.get("#formEscolherCliente").submit();

    cy.waitLongLoad("@vincularCliente");

    //conferir se o botão "Mostrar opções de pagamento" está visível
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');

    cy.get("a.btn.btn-success.loading-feedback")
      .contains("Adicionar produto")
      .click();

    //conferir se o botão "Mostrar opções de pagamento" está visível
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');

    cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

    cy.get('input[id="codigoProduto"]').type("34387024");
    cy.get('#form-buscar-produto button[type="submit"]').click();

    //conferir se o botão "Mostrar opções de pagamento" está visível
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');

    cy.get('input[type="radio"]').eq(0).click();

    //alterar valor do produto para preço sugerido
    cy.get('button[id="valor-item-dropdown"]').click();
    cy.get('li[data-kit-index="2"]').click();

    cy.waitLongLoad("@buscarServicos");

    //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
    cy.get('button[id="ir-para-entrega-button"]').click();
    cy.get('input[id="selecionar-todos-itens"]').click();
    cy.get('div[class="radio-toggle-button w-full"]').eq(3).click();
    cy.get('button[id="btn-gravar-entrega"]').click();
    //conferir se o botão "Mostrar opções de pagamento" está visível
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');
    cy.get('a').contains('Ir para Serviços').click();
    cy.get('div').contains('Ir para pagamento').click();
    cy.wait(1000);
    cy.contains('button', 'Confirmar').click();

    //conferir se o botão "Mostrar opções de pagamento" está visível
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');
    cy.get("#btnMostrarOpcoesPagamento").click();
        cy.wait(5000);
    cy.get('button').contains('Continuar Pedido').click();
    // cy.intercept("POST", "**/app/pedidos/v2/servicos").as("validarServicos");
    // cy.waitLongLoad("@validarServicos");

    // cy.intercept("GET", "**/app/pedidos/v2/pagamentos").as("telaPagamento");
    // cy.waitLongLoad("@telaPagamento");

    // Selecionar forma de pagamento
    // cy.get('#formaAtendimento').select('MS CREDITO');
    // cy.get('#numeroParcelas').select('10');
    // cy.get('button[id="calcular-parcelas-button"]').click();
    // cy.get('button[id="gravar-metodo-button"]').click();
    // cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();
  });
});
