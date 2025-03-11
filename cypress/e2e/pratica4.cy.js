describe('Verificação de imagens do ADOPET', () => {
    beforeEach(() => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.get('[href="/home"]').click();
    });
  
    it('Deve acessar a página home e conferir se as imagens estão aparecendo corretamente na tela', () => {
      
    })
  })