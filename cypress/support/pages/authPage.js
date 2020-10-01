import BasePage from "./basePage";


export const AuthPage =  {
    open: () => cy.visit('/auth'),
    regHeader: () => cy.get('[data-test="registration-header"]'),
    regError: () => cy.get('[data-test="registration-error"]'),
    regErrorClose: () => cy.get('[data-test="registration-error"] > .close'),
    regFullName: () => cy.get('[data-test="registerFullName-text-input"]'),
    regFullNameLabel: () => cy.get('[data-test="registerFullName-text-input-label"]'),
    regUsername: () => cy.get('[data-test="registerUsername-text-input"]'),
    regUsernameLabel: () => cy.get('[data-test="registerUsername-text-input-label"]'),
    regPassword: () => cy.get('[data-test="registerPassword-password-input"]'),
    regPasswordLabel: () => cy.get('[data-test="registerPassword-password-input-label"]'),
    regEmail: () => cy.get('[data-test="registerEmail-email-input"]'),
    regEmailLabel: () => cy.get('[data-test="registerEmail-email-input-label"]'),
    regSubmit: () => cy.get('[data-test="registration-submit"]'),
    register: ({ fullName, username, password, email }) => {
        BasePage.fillField(AuthPage.regFullName(), fullName)
        BasePage.fillField(AuthPage.regUsername(), username)
        BasePage.fillField(AuthPage.regPassword(), password)
        BasePage.fillField(AuthPage.regEmail(), email)
        AuthPage.regSubmit().click()
    },
    handleRegister: (data = {}, status = 200) => {
        cy.route2('**/register', {
            statusCode: status,
            body: {
                email: "test-mail@example.com",
                full_name: "Test User",
                id: "5f7607dc572d950833cca0fd",
                is_admin: false,
                token: "5f7607dc572d950833cca0fe",
                username: "testuser",
                ...data
            }
        }).as("handleRegister")
    }
}
