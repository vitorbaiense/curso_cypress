describe('Verificação de cadastro do ADOPET', () => {
  it('Deve acessar a página, ir para a página de cadastro, preencher os dados corretamente e criar cadastro', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.contains('a', 'Cadastrar').click();
    cy.get('input[name="nome"]').type('vitor baiense');
    cy.get('input[name="email"]').type('vitorbaiense@gmail.com');
    cy.get('input[name="password"]').type('Vitor1234');
    cy.get('input[name="confirm_password"]').type('Vitor1234');
    cy.contains('button', 'Cadastrar').click();
  })
})