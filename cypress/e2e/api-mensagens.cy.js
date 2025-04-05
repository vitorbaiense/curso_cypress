describe('API AdoPet', () => {
    const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDJkMDlkNS0yZTVkLTRmOWUtOWMyMy04MzVmNmIzYWI4NmMiLCJhZG9wdGVyTmFtZSI6InZpdG9yIGJhaWVuc2UiLCJpYXQiOjE3NDM4NTg0NDcsImV4cCI6MTc0NDExNzY0N30.kLAToulyRygT1mCAiMm190sREpD_I5aaq0a8C1-BMfE'

    beforeEach(() => {
        // Escreva o código que será executado antes de cada teste
    });

    it('Mesagens da API', () => {
        cy.request({
            method: 'GET',
            url: 'https://adopet-api-i8qu.onrender.com/mensagem/902d09d5-2e5d-4f9e-9c23-835f6b3ab86c',
            headers: { authorization}
        }).then((res) => {
            expect(res.status).to.be.eq(200);
            expect(res.body).is.not.empty;
            expect(res.body).to.have.property('msg');
        });
    });
});