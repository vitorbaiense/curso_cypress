describe('acessando diferentes páginas do ADOPET', () => {
    it('Deve acessar a página inicial e cliclar no botão "Ver pets disponíveis para adoção”, Visite a página de principal do AdoPet e teste os botões header, Visite a página de /login do Adopet, Visite a página de /home do Adopet, Visite a página de /home do AdoPet e clique no botão “Falar com o responsável”', () => {
      cy.visit('https://adopet-frontend-cypress.vercel.app/');
      cy.contains('a', 'Ver pets disponíveis para adoção').click();
      cy.wait(2000);
      cy.get('a[href="/"]').click();
      cy.wait(2000);
      cy.get('a[href="/mensagem"').click();
      cy.wait(2000);
      cy.get('a[href="/"]').click();
      cy.contains('a', 'Fazer login').click();
      cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
      cy.get('input[name="password"]').type('Vitor1234');
      cy.contains('button', 'Entrar').click();
      cy.wait(4000);
      cy.get('div[class="card"]').contains('a', 'Falar com responsável').click();
      //cy.contains('card').children('h4','Yoda').should('a', 'Falar com responsável').click(); / tentantiva de selecionar o botão de falar com responsável do Yoda, e não o primeiro botão.
    })
  })