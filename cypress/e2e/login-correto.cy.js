describe('Página de login', () => {
    beforeEach(() => {
        cy.visit('https://adopet-frontend-cypress.vercel.app/');
        cy.get('[data-test="login-button"]').click();
    })

    it('Deve preencher os campos do login corretamente e autenticar o usuário na página', () => {

      cy.login('vitorbaiense@gmail.com', 'Vitor1234');
      // cy.get('[data-test="input-loginEmail"]').type('vitorbaiense@gmail.com');
      // cy.get('[data-test="input-loginPassword"]').type('Vitor1234');
      // cy.get('[data-test="submit-button"]').click();
    })
  })