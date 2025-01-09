describe('Verificação de texto sobre a pagina inicial AdoPet', () => {
    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
    });
  
    
    it('Deve acessar a página e conferir todos os textos apresentados na tela', () => {
        cy.title().should('eq', 'AdoPet');
        cy.contains('Quem ama adota!').should('be.visible');
        cy.contains('p', 'Adotar pode mudar uma vida. Que tal buscar seu novo melhor amigo hoje? Vem com a gente!').should('be.visible');
    })

    it('Deve acessar a página, clicar no botão de ícone da mensagem no na header e realizar o login corretamente', () => {
        cy.get('.header__message').click();
        cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
        cy.get('input[name="password"]').type('Vitor1234');
        cy.get('[data-test="submit-button"]').click();
    })
  })