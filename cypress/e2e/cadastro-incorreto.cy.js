describe('Página de cadastro do ADOPET', () => {
    beforeEach(() =>{
      cy.visit('https://adopet-frontend-cypress.vercel.app');
      cy.get('[data-test="register-button"]').click();
      cy.intercept('POST', 'https://adopet-api-i8qu.onrender.com/adotante/login', {
        statusCode: 400, }).as('stubPost');
    })

    it('Verifica mensagem de de falha no login', () => {
    //   cy.get('input[name="nome"]').type('vitor baiense');
    //   cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
    //   cy.get('input[name="password"]').type('Vitor1234');
    //   cy.get('input[name="confirm_password"]').type('Vitor1234');
      cy.contains('button', 'Cadastrar').click();
      cy.contains('É necessário informar um endereço de email').should('be.visible');
      cy.contains('Crie uma senha').should('be.visible');
      cy.contains('Repita a senha criada acima').should('be.visible');
    })

    it('Deve falhar mesmo que os campos sejam preenchidos corretamente', () => {
      cy.login('vitorsadad@gmail.com', 'Vitor5493');
      cy.wait('@stubPost');
      cy.contains('Falha no login. Consulte suas credenciais.').should('be.visible');
    })

  })