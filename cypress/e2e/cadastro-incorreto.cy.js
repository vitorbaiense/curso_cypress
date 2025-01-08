describe('Página de cadastro do ADOPET', () => {
    beforeEach(() =>{
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.get('[data-test="register-button"]').click();
    })

    it('Preencher os campos do formulário incorretamente e exibir mensagens ao usuário', () => {
    //   cy.get('input[name="nome"]').type('vitor baiense');
    //   cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
    //   cy.get('input[name="password"]').type('Vitor1234');
    //   cy.get('input[name="confirm_password"]').type('Vitor1234');
      cy.contains('button', 'Cadastrar').click();
      cy.contains('É necessário informar um endereço de email').should('be.visible');
      cy.contains('Crie uma senha').should('be.visible');
      cy.contains('Repita a senha criada acima').should('be.visible');
    })
  })