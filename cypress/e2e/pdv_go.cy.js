/// <reference types="cypress" />

import { it } from "mocha";

describe('Teste Mobile no PDV Go', () => {
    beforeEach(() => {
        cy.viewport(393, 852); // Simula um dispositivo mobile
        cy.visit('http://mobile.webpdv.msap-integrado.qa.simonettidev.com.br/'); // Altere para a URL do sistema
    });

    it('Deve exibir o menu mobile corretamente', () => {
        cy.get('.ms-box').should('be.visible');
    });

    it('Deve permitir login pelo mobile', () => {
        cy.get('input[id="username"]').type('gustavo20');
        cy.get('input[type="password"]').type('Simonetti@123');
        cy.get('button[type="submit"]').click();
    });

    it('realizar atendimento com cliente que possui  cartão simonetti ativo', () => {
        cy.get('input[id="cpfCnpj"]').type(cpf_cartao_simonetti_ativo.json);
        cy.get('button[type="submit"]').click();
        cy.get('a[class="btn btn-success loading-feedback"]').click();
        cy.get('input[id="codigoProduto"]').type('001282');
        cy.get('button[type="submit"]').click();
        cy.get('input[type="radio"]').eq(0).click();
        cy.get('button[id="ir-para-entrega-button"]').click();
        cy.get('input[id="selecionar-todos-itens"]').click();


    });
});