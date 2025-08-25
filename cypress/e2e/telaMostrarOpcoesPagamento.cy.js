/// <reference types="cypress" />
Cypress.Commands.add("waitLongLoad", (waitRef = null) => {
    cy.get("#TB_load").should("be.visible");
    cy.wait(waitRef);
    cy.get("#TB_load").should("not.exist");
});

describe('Fluxo de inicio de pedido utilizando o PDV GO, conferindo as opções de pagamento variando com o tipo de cliente', () => {
    let cpfsElegiveis;
    let cpfsInelegiveis;
    let cpfCartaoAtivo;
    let prdno20;

    // Carrega os CPFs antes de rodar qualquer teste
    before(() => {
        cy.fixture('cpf_elegivel_msap.json').then((data) => {
            cpfsElegiveis = data;
        });

        cy.fixture('cpf_inelegivel_msap').then((data) => {
            cpfsInelegiveis = data;
        });

        cy.fixture('cpf_cartao_simonetti_ativo.json').then((data) => {
            cpfCartaoAtivo = data;
        });

        cy.fixture('produtos_retiraloja_msap_20.json').then((data) => {
            prdno20 = data;
        });
    });


    beforeEach(() => {
        cy.pdvGoMsap();
    });

    it("Deve inserir cliente elegivel para o Cartão Simonetti, aparecendo os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro", () => {
        const cpfAleatorioElegivel = cpfsElegiveis[Math.floor(Math.random() * cpfsElegiveis.length)].cpf_cnpj;
        cy.log(`Usando o CPF: ${cpfAleatorioElegivel}`);

        const prdnoRetiraLoja = prdno20[Math.floor(Math.random() * prdno20.length)].prdno;
        cy.log(`Usando o produto: ${prdnoRetiraLoja}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioElegivel);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').clear().type(prdnoRetiraLoja);
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
        cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
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

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('button[id="gravar-metodo-button"]').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_msap();
        cy.descartaPedidoFilaAtendimento();
    });

    it("Deve inserir cliente elegivel para o Cartão Simonetti, aparecendo os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro, adicionando o carne ouro como método de pagamento", () => {
        const cpfAleatorioElegivel = cpfsElegiveis[Math.floor(Math.random() * cpfsElegiveis.length)].cpf_cnpj;
        cy.log(`Usando o CPF: ${cpfAleatorioElegivel}`);

        const prdnoRetiraLoja = prdno20[Math.floor(Math.random() * prdno20.length)].prdno;
        cy.log(`Usando o produto: ${prdnoRetiraLoja}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioElegivel);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').clear().type(prdnoRetiraLoja);
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
        cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
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
        cy.get('#formaAtendimento').select('CARNE OURO');

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);
        
        cy.get('#numeroParcelas').select('12');
        cy.get('#calcular-parcelas-button').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('#gravar-metodo-button').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_msap();
        cy.descartaPedidoFilaAtendimento();
    });

    it("Deve inserir cliente com Cartão Simonetti ativo, aparecendo os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro, adicionando o cartão simonetti como método de pagamento", () => {
        const cpfAleatorioAtivo = cpfCartaoAtivo[Math.floor(Math.random() * cpfCartaoAtivo.length)].documento;
        cy.log(`Usando o CPF: ${cpfAleatorioAtivo}`);

        const prdnoRetiraLoja = prdno20[Math.floor(Math.random() * prdno20.length)].prdno;
        cy.log(`Usando o CPF: ${prdnoRetiraLoja}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioAtivo);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').type(prdnoRetiraLoja);
        cy.get('#form-buscar-produto button[type="submit"]').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        cy.get('input[type="radio"]').eq(0).click();

        //alterar valor do produto para preço sugerido
        cy.get('button[id="valor-item-dropdown"]').click();
        cy.get('li[data-kit-index="2"]').click();

        cy.waitLongLoad("@buscarServicos");

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
        cy.get('button[id="ir-para-entrega-button"]').click();
        cy.get('input[id="selecionar-todos-itens"]').click();
        cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
        cy.get('button[id="btn-gravar-entrega"]').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        //conferir se o botão "Mostrar opções de pagamento" está visível
        cy.get('a').contains('Ir para Serviços').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        cy.get('div').contains('Ir para pagamento').click();
        cy.wait(1000);
        cy.contains('button', 'Confirmar').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        // Selecionar forma de pagamento
        cy.get('#utilizarCartaoSimonetti').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);
        
        cy.get('#numeroParcelas').select('6');
        // cy.get('button[id="calcular-parcelas-button"]').click();

        cy.mostrarOpcoesPagamento(["Cartão Simonetti", "Carnê Ouro"]);

        cy.get('button').contains('Gravar Método').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_msap();
        cy.descartaPedidoFilaAtendimento();
    });

    it("Deve inserir cliente não elegível, e NÃO deve aparecer os ícones dos métodos 'Cartão Simonetti' e Carnê Ouro ", () => {
        const cpfAleatorioInelegivel = cpfsInelegiveis[Math.floor(Math.random() * cpfsInelegiveis.length)].cliente_cpfCnpj;
        cy.log(`Usando o CPF: ${cpfAleatorioInelegivel}`);

        const prdnoRetiraLoja = prdno20[Math.floor(Math.random() * prdno20.length)].prdno;
        cy.log(`Usando o CPF: ${prdnoRetiraLoja}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioInelegivel);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').type(prdnoRetiraLoja);
        cy.get('#form-buscar-produto button[type="submit"]').click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('input[type="radio"]').eq(0).click();

        //alterar valor do produto para preço sugerido
        cy.get('button[id="valor-item-dropdown"]').click();
        cy.get('li[data-kit-index="2"]').click();

        cy.waitLongLoad("@buscarServicos");

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
        cy.get('button[id="ir-para-entrega-button"]').click();
        cy.get('input[id="selecionar-todos-itens"]').click();
        cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
        cy.get('button[id="btn-gravar-entrega"]').click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        //conferir se o botão "Mostrar opções de pagamento" está visível
        cy.get('a').contains('Ir para Serviços').click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('div').contains('Ir para pagamento').click();
        cy.wait(1000);
        cy.contains('button', 'Confirmar').click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        // Selecionar forma de pagamento
        cy.get('#formaAtendimento').select('MS CREDITO');

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);
        
        cy.get('#numeroParcelas').select('10');
        cy.get('button[id="calcular-parcelas-button"]').click();

        cy.naoMostrarOpcoesPagamento(["Cartão Simonetti (precisa ativar)", "Carnê Ouro"]);

        cy.get('button[id="gravar-metodo-button"]').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_msap();
        cy.descartaPedidoFilaAtendimento();
    });

    it("Deve inserir cliente não elegível, adicionar um produto elegível para o método 'CDC 120 Dias' e conferir a apresentação do ícone", () => {
        const cpfAleatorioInelegivel = cpfsInelegiveis[Math.floor(Math.random() * cpfsInelegiveis.length)].cliente_cpfCnpj;
        cy.log(`Usando o CPF: ${cpfAleatorioInelegivel}`);

        cy.intercept("POST", "**/app/pedidos/v2/vincular-cliente").as("vincularCliente");

        cy.get('input[id="cpfCnpj"]').clear().type(cpfAleatorioInelegivel);
        cy.get("#formEscolherCliente").submit();

        cy.waitLongLoad("@vincularCliente");

        cy.naoMostrarOpcoesPagamento(["CDC 120 Dias"]);

        cy.get("a.btn.btn-success.loading-feedback")
            .contains("Adicionar produto")
            .click();

        cy.naoMostrarOpcoesPagamento(["CDC 120 Dias"]);

        cy.intercept("POST", "**/app/pedidos/v2/produtos/servicos/buscar").as("buscarServicos");

        cy.get('input[id="codigoProduto"]').type("209445");
        cy.get('#form-buscar-produto button[type="submit"]').click();

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        cy.get('input[type="radio"]').eq(0).click();

        //alterar valor do produto para preço sugerido
        cy.get('button[id="valor-item-dropdown"]').click();
        cy.get('li[data-kit-index="2"]').click();

        cy.waitLongLoad("@buscarServicos");

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        //tela para selecionar e confirmar entrega do tipo retirado pelo cliente e serviços
        cy.get('button[id="ir-para-entrega-button"]').click();
        cy.get('input[id="selecionar-todos-itens"]').click();
        cy.get('div[class="radio-toggle-button w-full"]').eq(2).click();
        cy.get('button[id="btn-gravar-entrega"]').click();

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        //conferir se o botão "Mostrar opções de pagamento" está visível
        cy.get('a').contains('Ir para Serviços').click();

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        cy.get('div').contains('Ir para pagamento').click();
        cy.wait(1000);
        cy.contains('button', 'Confirmar').click();

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        // Selecionar forma de pagamento
        cy.get('#formaAtendimento').select('CDC 120 DIAS');

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);
        
        cy.get('#numeroParcelas').select('18');
        cy.get('button[id="calcular-parcelas-button"]').click();

        cy.mostrarOpcoesPagamento(["CDC 120 Dias"]);

        cy.get('button[id="gravar-metodo-button"]').click();
        cy.get('a[class="btn btn-success btn-block loading-feedback"]').click();

        cy.login_webpdv_msap();
        cy.descartaPedidoFilaAtendimento();
    });

});