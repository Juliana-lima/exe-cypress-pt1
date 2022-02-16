/// <reference types="cypress" />

var faker = require('faker'); //Criando variáveis globais
let nomeFaker = faker.name.firstName();
let sobreNomeFaker = faker.name.lastName();


describe('Funcionalidade pré-cadastro', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get(':nth-child(2) > h2').should('contain', 'Register') //Validando a tela
    });
    it('Deve completar o pré-cadastro com sucesso com senha forte', () => {
        let emailFaker = faker.internet.email(nomeFaker);

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('3KLG3r5uub2XSe%', {log:false}) //Protegendo dados sensíveis, como a senha
        cy.get('.woocommerce-password-strength').should('contain', 'Forte')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').should('contain', 'Detalhes da conta')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobreNomeFaker)
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')    

    });
    
    it('Deve salvar alteração de senha médio para senha forte', () => {
        let emailFaker = faker.internet.email(nomeFaker);
        
        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('74859erf%', {log:false}) //Protegendo dados sensíveis, como a senha
        cy.get('.woocommerce-password-strength').should('contain', 'Médio')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').should('contain', 'Detalhes da conta')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobreNomeFaker)
        cy.get('#password_current').type('74859erf%')
        cy.get('#password_1').type('5KywnJB$2XSe')
        cy.get('.woocommerce-password-strength').should('contain', 'Forte')
        cy.get('#password_2').type('5KywnJB$2XSe')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

        
    });

});