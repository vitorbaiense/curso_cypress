describe('Pagina de cadastro', () => {

    let usuarios; // Variável para armazenar os dados do fixture

    before(() => {
        cy.fixture('usuarios.json').then((dados) => {
            usuarios = dados.usuarios; // Carrega os dados do fixture antes de todos os testes
        });
    });

    beforeEach(() => {
        cy.visit('https://adopet-frontend-cypress.vercel.app');
        cy.get('[data-test="register-button"]').click();
    });

        it('Deve preencher os campos do formulario corretamente para cadastrar um novo usuario', function () {
            usuarios.forEach(usuario => {
            cy.get('[data-test="input-name"]').clear().type(usuario.name);
            cy.get('[data-test="input-email"]').clear().type(usuario.email);
            cy.get('[data-test="input-password"]').clear().type(usuario.password);
            cy.get('[data-test="input-confirm-password"]').clear().type(usuario.password);
            cy.get(`[data-test="submit-button"]`).click();
        });
    });
});