/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => {
    cy.get("#TB_load").should("be.visible");
    cy.wait(waitRef);
    cy.get("#TB_load").should("not.exist");
});

describe('Fluxo de inicio de pedido utilizando o PDV GO, conferindo as opções de pagamento variando com o tipo de cliente', () => {
    let cpfsElegiveis;
    let cpfsInelegiveis;

    // Carrega os CPFs antes de rodar qualquer teste
    before(() => {
        cy.fixture('cpf_cartao_simonetti_ativo_gama').then((data) => {
            cpfsElegiveis = data;
        });

        cy.fixture('cpf_inelegivel').then((data) => {
            cpfsInelegiveis = data;
        });
    });


    beforeEach(() => {
        cy.pdvGoGama();
    });

    it("Deve inserir cliente elegivel para o Cartão Simonetti, aparecendo os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro ", () => {
        const cpfAleatorioAtivo = cpfsElegiveis[Math.floor(Math.random() * cpfsElegiveis.length)].cpf_cnpj;
        cy.log(`Usando o CPF: ${cpfAleatorioAtivo}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioAtivo);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').type("001957 ");
        cy.get('#form-buscar-produto button[type="submit"]').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('input[type="radio"]').eq(0).click();

        //alterar valor do produto para preço sugerido
        cy.get('button[id="valor-item-dropdown"]').click();
        cy.get('li[data-kit-index="2"]').click();

        cy.waitLongLoad("@buscarServicos");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
        cy.get('button[id="ir-para-entrega-button"]').click();
        cy.get('input[id="selecionar-todos-itens"]').click();
        cy.get('div[class="radio-toggle-button w-full"]').eq(3).click();
        cy.get('button[id="btn-gravar-entrega"]').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        //conferir se o botão "Mostrar opções de pagamento" está visível
        cy.get('a').contains('Ir para Serviços').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('div').contains('Ir para pagamento').click();
        cy.wait(1000);
        cy.contains('button', 'Confirmar').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        // Selecionar forma de pagamento
        cy.get('#formaAtendimento').select('MS CREDITO');

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);
        
        cy.get('#numeroParcelas').select('10');
        cy.get('button[id="calcular-parcelas-button"]').click();

        // cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('button[id="gravar-metodo-button"]').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_gama();
        cy.descartaPedidoFilaAtendimento();
    });

    // it("Deve inserir cliente não elegível, e NÃO deve aparecer os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro ", () => {
    //     const cpfAleatorioInelegivel = cpfsInelegiveis[Math.floor(Math.random() * cpfsInelegiveis.length)].cpf_cnpj;
    //     cy.log(`Usando o CPF: ${cpfAleatorioInelegivel}`);

    //     cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

    //     cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioInelegivel);
    //     cy.get("#formEscolherCliente").submit();

    //     cy.waitLongLoad("@vincularCliente");

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     cy.get("a.btn.btn-success.loading-feedback")
    //         .contains("Adicionar produto")
    //         .click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

    //     cy.get('input[id="codigoProduto"]').type("001957 ");
    //     cy.get('#form-buscar-produto button[type="submit"]').click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     cy.get('input[type="radio"]').eq(0).click();

    //     //alterar valor do produto para preço sugerido
    //     cy.get('button[id="valor-item-dropdown"]').click();
    //     cy.get('li[data-kit-index="2"]').click();

    //     cy.waitLongLoad("@buscarServicos");

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
    //     cy.get('button[id="ir-para-entrega-button"]').click();
    //     cy.get('input[id="selecionar-todos-itens"]').click();
    //     cy.get('div[class="radio-toggle-button w-full"]').eq(3).click();
    //     cy.get('button[id="btn-gravar-entrega"]').click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     //conferir se o botão "Mostrar opções de pagamento" está visível
    //     cy.get('a').contains('Ir para Serviços').click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     cy.get('div').contains('Ir para pagamento').click();
    //     cy.wait(1000);
    //     cy.contains('button', 'Confirmar').click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     // Selecionar forma de pagamento
    //     cy.get('#formaAtendimento').select('MS CREDITO');

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);
        
    //     cy.get('#numeroParcelas').select('10');
    //     cy.get('button[id="calcular-parcelas-button"]').click();

    //     cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

    //     cy.get('button[id="gravar-metodo-button"]').click();
    //     cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

    //     cy.login_webpdv_gama();
    //     cy.descartaPedidoFilaAtendimento();
    // });

    // it("Deve inserir cliente não elegível, adicionar um produto elegível para o método 'CDC 120 Dias' e conferir a apresentação do ícone", () => {
    //     const cpfAleatorioInelegivel = cpfsInelegiveis[Math.floor(Math.random() * cpfsInelegiveis.length)].cpf_cnpj;
    //     cy.log(`Usando o CPF: ${cpfAleatorioInelegivel}`);

    //     cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

    //     cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioInelegivel);
    //     cy.get("#formEscolherCliente").submit();

    //     cy.waitLongLoad("@vincularCliente");

    //     cy.naoMostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     cy.get("a.btn.btn-success.loading-feedback")
    //         .contains("Adicionar produto")
    //         .click();

    //     cy.naoMostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

    //     cy.get('input[id="codigoProduto"]').type("012201");
    //     cy.get('#form-buscar-produto button[type="submit"]').click();

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     cy.get('input[type="radio"]').eq(0).click();

    //     //alterar valor do produto para preço sugerido
    //     cy.get('button[id="valor-item-dropdown"]').click();
    //     cy.get('li[data-kit-index="2"]').click();

    //     cy.waitLongLoad("@buscarServicos");

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
    //     cy.get('button[id="ir-para-entrega-button"]').click();
    //     cy.get('input[id="selecionar-todos-itens"]').click();
    //     cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
    //     cy.get('button[id="btn-gravar-entrega"]').click();

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     //conferir se o botão "Mostrar opções de pagamento" está visível
    //     cy.get('a').contains('Ir para Serviços').click();

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     cy.get('div').contains('Ir para pagamento').click();
    //     cy.wait(1000);
    //     cy.contains('button', 'Confirmar').click();

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     // Selecionar forma de pagamento
    //     cy.get('#formaAtendimento').select('MS CREDITO');

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);
        
    //     cy.get('#numeroParcelas').select('10');
    //     cy.get('button[id="calcular-parcelas-button"]').click();

    //     cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

    //     cy.get('button[id="gravar-metodo-button"]').click();
    //     cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

    //     cy.login_webpdv_gama();
    //     cy.descartaPedidoFilaAtendimento();
    // });

});