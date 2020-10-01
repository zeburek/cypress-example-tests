import {AuthPage} from "../../support/pages";
import {Constants, UserRegister} from "../../support/testData";


describe('Registration form', () => {
    beforeEach(() => {
        AuthPage.open()
    })

    it('Registration form contents', function () {
        AuthPage.regHeader().should('have.text', Constants.regHeader)
        AuthPage.regError().should('not.exist')
        AuthPage.regFullName().should('exist')
        AuthPage.regFullNameLabel().should('have.text', Constants.regFullName)
        AuthPage.regUsername().should('exist')
        AuthPage.regUsernameLabel().should('have.text', Constants.regUsername)
        AuthPage.regPassword().should('exist')
        AuthPage.regPasswordLabel().should('have.text', Constants.regPassword)
        AuthPage.regEmail().should('exist')
        AuthPage.regEmailLabel().should('have.text', Constants.regEmail)
        AuthPage.regSubmit().should('have.text', Constants.regSubmit)
    });

    it('Submit form with all fields', function () {
        AuthPage.handleRegister()
        AuthPage.register(UserRegister)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    });

    it('Submit empty register form', function () {
        AuthPage.register({})
        AuthPage.regError().should('have.text', Constants.regErrorNoEmptyUsername)
        AuthPage.regErrorClose().click()
        AuthPage.regError().should('not.exist')
    });

    it('Submit form with empty password', function () {
        AuthPage.register({...UserRegister, password: ""})
        AuthPage.regError().should('have.text', Constants.regErrorNoEmptyPassword)
    });

    it('Submit form with empty email', function () {
        AuthPage.register({...UserRegister, email: ""})
        AuthPage.regError().should('have.text', Constants.regErrorNoEmptyEmail)
    });

    Array.from([
        ["t", Constants.regErrorSmallUsername],
        ["test", Constants.regErrorSmallUsername],
        ["test-p", Constants.regErrorIncorrectUsername],
        [" testp", Constants.regErrorIncorrectUsername],
    ]).forEach(([username, error]) => {
        it(`Submit form with incorrect username: ${username}`, function () {
            AuthPage.register({...UserRegister, username})
            AuthPage.regError().should('have.text', error)
        });
    })

    Array.from([
        "t",
        "testp",
    ]).forEach((password) => {
        it(`Submit form with incorrect password: ${password}`, function () {
            AuthPage.register({...UserRegister, password})
            AuthPage.regError().should('have.text', Constants.regErrorIncorrectPassword)
        });
    })

    Array.from([
        "test-user",
        "test-user@yandex",
        "@yandex.ru",
    ]).forEach((email) => {
        it(`Submit form with incorrect email: ${email}`, function () {
            AuthPage.register({...UserRegister, email})
            AuthPage.regError().should('have.text', Constants.regErrorIncorrectEmail)
        });
    })
})