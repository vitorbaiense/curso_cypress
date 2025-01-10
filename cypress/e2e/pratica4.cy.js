describe('Verificação de imagens do ADOPET', () => {
    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.get('[href="/home"]').click();
    });
  
    it('Deve acessar a página home e conferir se as imagens estão aparecendo corretamente na tela', () => {
      cy.cadastrar('vitor baiense', 'vitorbaiense@gmail.com', 'Vitor1234');
      // cy.get('input[name="nome"]').type('vitor baiense');
      // cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
      // cy.get('input[name="password"]').type('Vitor1234');
      // cy.get('input[name="confirm_password"]').type('Vitor1234');
      // cy.contains('button', 'Cadastrar').click();
    })
  })