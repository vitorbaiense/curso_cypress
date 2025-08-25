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

Cypress.Commands.add('login_webpdv_msap', () => {
    cy.viewport(1024, 768);

    cy.visit('http://webpdv.msap-integrado.qa.simonettidev.com.br/webpdv/index.php?f_bln_sair=1');
    cy.get('input[name="usuario"]').type('gustavo20');
    cy.get('input[name="senha"]').type('Simonetti@123');
    cy.get('input[name="submit"]').click();
});

Cypress.Commands.add('login_webpdv_gama', () => {
    cy.viewport(1024, 768);

    cy.visit('http://gama.qa.simonettidev.com.br:8080/webpdv/index.php?f_bln_sair=1');
    cy.get('input[name="usuario"]').type('gustavo20');
    cy.get('input[name="senha"]').type('Simonetti@123');
    cy.get('input[name="submit"]').click();
});

Cypress.Commands.add("gerarTelefone", () => {
    const ddd = Math.floor(11 + Math.random() * 88);
    const numero = Math.floor(9900000000 + Math.random() * 99999999);

    return `(${ddd}) ${numero.toString().slice(0, 5)}-${numero.toString().slice(5)}`;
});

Cypress.Commands.add("mostrarOpcoesPagamento", (opcoesEsperadas = [], escolher = null) => {
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');
    cy.get("#btnMostrarOpcoesPagamento").click();
    // cy.get('div').contains('style="display: block;"').should('be.visible');

    // Verifica cada opção de pagamento esperada
    opcoesEsperadas.forEach((opcao) => {
        cy.get(`img[alt="${opcao}"]`).should('exist');
    });

    cy.wait(2000);
    cy.get('button').contains('Continuar Pedido').click({ force: true });
});

Cypress.Commands.add("naoMostrarOpcoesPagamento", (opcoesEsperadas = [], escolher = null) => {
    cy.get("#btnMostrarOpcoesPagamento").should('be.visible');
    cy.get("#btnMostrarOpcoesPagamento").click();
    // cy.get('div').contains('style="display: block;"').should('be.visible');

    // Verifica cada opção de pagamento esperada
    opcoesEsperadas.forEach((opcao) => {
        cy.get(`img[alt="${opcao}"]`).should('not.exist');
    });

    cy.wait(2000);
    cy.get('button').contains('Continuar Pedido').click({ force: true });
});

Cypress.Commands.add("pdvGoGama", () => {
    cy.viewport(393, 852);

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

Cypress.Commands.add("pdvGoMsap", () => {
    cy.viewport(393, 852);

    cy.visit('https://oauth.msap-integrado.qa.simonettidev.com.br'); //msap
    cy.get('#username').type('gustavo20');
    cy.get('#password').type('Simonetti@123', { log: false });
    cy.get('button[type="submit"]').click();

    // Intercepta a chamada que valida o login no mobile
    cy.intercept('GET', '**/app/pedidos/v2/criar**').as('usuarioLogado');

    // Agora acessa a página inicial
    cy.visit('https://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/'); //msap

    // Aguarda a API de usuário logado responder
    cy.wait('@usuarioLogado');
});

Cypress.Commands.add('descartaPedidoFilaAtendimento', () => {
    cy.intercept('GET', '**/webpdv/vendas/fila_atendimento**').as('carregarFilaAtendimento');

    cy.get('#menuone > :nth-child(3)').click().realHover('').get('a').contains('Fila de Atendimento').click({ force: true });

    cy.wait('@carregarFilaAtendimento');

    cy.get('.hide > img').realHover('').click({ force: true }).get('.analisar_pedido').click();
    cy.get('#descartar').click();
    cy.on('window:confirm', (str) => {
        // O str é o texto do pop-up
        expect(str).to.include('Deseja realmente executar essa ação?');
        // Por padrão, o Cypress já retorna 'true' para o evento
        // o que simula o clique em OK
    });
});

// Descartar pedido
Cypress.Commands.add('descartaPedido', () => {
    cy.get('#menuone > :nth-child(17)').click();
    cy.get('.menu-ul').contains('Criar Pedido').click();
    cy.get('.hide > img').realHover('').click().get('.descartar').click().wait(300).get(':nth-child(1) > .ui-button-text').click();
    cy.get('[aria-labelledby="ui-dialog-title-2"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > .ui-button > .ui-button-text').click();
})


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