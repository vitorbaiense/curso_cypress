describe('Página de login', () => {
    beforeEach(() => {
        cy.visit('https://adopet-frontend-cypress.vercel.app/');
        cy.get('[data-test="login-button"]').click();
    })

    it('Deve preencher o campo de email incorretamente e conferir a mensagem de falha no login sobre o email incorreto, seguindo a regra de negócios', () => {

        // conferindo a mensagem de falha no login sobre o email incorreto
        cy.login('vitorbaiensegmail.com', 'Vitor1234');
      // cy.get('[data-test="input-loginEmail"]').type('vitorbaiensegmail.com');
      // cy.get('[data-test="input-loginPassword"]').type('Vitor1234')
      cy.contains('Por favor, verifique o email digitado').should('be.visible');
    })

    it('Deve preencher o campo de senha incorretamente e confer a mensagem de falha no login sobre a senha, seguindo a regra de negócios', () => {

         cy.login('vitorbaiense@gmail.com', 'vitor21');       
      // cy.get('[data-test="input-loginEmail"]').type('vitorbaiense@gmail.com');
      // cy.get('[data-test="input-loginPassword"]').type('vitor21');
      cy.get('[data-test="submit-button"]').click();
      cy.contains('A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres').should('be.visible');
  })
})