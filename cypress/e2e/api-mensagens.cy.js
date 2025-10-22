describe('API AdoPet', () => {
    const tempoEsperado = Math.random() * 1000;

    beforeEach(() => {
        // Escreva o código que será executado antes de cada teste
    });

    it('Mesagens da API', () => {
        cy.request({
            method: 'GET',
            url: 'https://adopet-api-i8qu.onrender.com/mensagem/902d09d5-2e5d-4f9e-9c23-835f6b3ab86c',
            headers: Cypress.env()
        }).then((res) => {
            expect(res.status).to.be.eq(200);
            expect(res.body).is.not.empty;
            expect(res.body).to.have.property('msg');
            // flaky test
            expect(res.duration).to.be.lte(tempoEsperado);
        });
    });
});