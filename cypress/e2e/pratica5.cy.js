//Faça uma request para a API do AdoPet com um usuário autenticado e verifique se, ao acessar a página de /perfil, há o nome do usuário em sua resposta.
//Na página de exemplos do cypress, verifique se a funcionalidade de delete funciona.
//Na página de exemplos do cypress. verifique se a funcionalidade de filtrar tarefas funciona.

describe('mensagem de perfil API', () => {
    const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MDJkMDlkNS0yZTVkLTRmOWUtOWMyMy04MzVmNmIzYWI4NmMiLCJhZG9wdGVyTmFtZSI6InZpdG9yIGJhaWVuc2UiLCJpYXQiOjE3NDM4Njc5MDUsImV4cCI6MTc0NDEyNzEwNX0.3ADvMLYY5kcKt6Hoqa-gl4TzaTGSg7kQoG6LxAMasMk'

    beforeEach(() => {
        cy.visit('https://adopet-frontend-cypress.vercel.app/');
        cy.get('[data-test="login-button"]').click();
        cy.login('vitorbaiense@gmail.com', 'Vitor1234');
        cy.get('button[class="menu__button"]').click();
        cy.get('a[href="/perfil"]').click();
    });

//talvez terei que criar um it separado para clicar no botao de menu e tambem para clicar em ver perfil

    it('mensagem api', () => {
        cy.request({
            method: 'GET',
            url: 'https://adopet-api-i8qu.onrender.com/adotante/perfil/902d09d5-2e5d-4f9e-9c23-835f6b3ab86c',
            headers: { authorization }
        }).then((res) => {
            expect(res.status).to.be.eq(200);
            expect(res.body).is.not.empty;
            expect(res.body).to.have.property('nome');
        });
    });
});