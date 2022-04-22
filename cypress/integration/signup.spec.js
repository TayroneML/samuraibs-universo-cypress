
import SignupPage from '../support/pages/signup'

describe('cadastro', () => {

    context('quando o usuário é novato', () => {
        const user = {
            name: 'Tayrone',
            email: 'tayrone@gmail.com',
            password: 'wen5840',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', () => {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        });
    });

    context('quando o email já existe', () => {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('não deve cadastrar o usuário', () => {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        });

    });

    context('quando o email é incorreto', () => {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', () => {
            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.alertHaveText('Informe um email válido')
        });
    })

    context('quando a senha for menor que o tamanho mínimo(6)', () => {
        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']



        beforeEach(function () {
            SignupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, () => {
                const user = {
                    name: 'Jason Friday',
                    email: 'jason@gmail.com',
                    password: p
                }

                SignupPage.form(user)
                SignupPage.submit()
                SignupPage.alertHaveText('Pelo menos 6 caracteres')
            });
        })
    })

    context('quando não for preenchido nenhum dos campos', () => {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            SignupPage.go()
            SignupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir mensagem de campo obrigatório: ' + alert.toLocaleLowerCase(), () => {
                SignupPage.alertHaveText(alert)
            });
        })
    })

}); 