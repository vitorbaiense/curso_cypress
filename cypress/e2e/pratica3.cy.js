describe('Verificação de texto sobre a pagina inicial AdoPet', () => {
    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
    });
  
    
    it('Deve acessar a página e conferir todos os textos apresentados na tela', () => {
        cy.title().should('eq', 'AdoPet');
        cy.contains('Quem ama adota!').should('be.visible');
        cy.get('section.initial > p')
        .should('have.text', 'Que tal mudar sua vida adotando seu novo melhor amigo? Vem com a gente!')
        .and('be.visible');

    })

    it('Deve acessar a página, clicar no botão de ícone da mensagem no na header e realizar o login corretamente', () => {
        cy.get('a[href="/mensagem"]').click();
        cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
        cy.get('input[name="password"]').type('Vitor1234');
    })
  })