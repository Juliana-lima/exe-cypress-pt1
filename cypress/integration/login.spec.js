/// <reference types="cypress" />

context('Funcionalidade Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get(':nth-child(1) > h2').should('contain', 'Login')//Validando a tela
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso', () => {
        
        cy.get('#username').type('mariateste1@teste.com.br')
        cy.get('#password').type('422070g#hLX', { log: false }) //Protegendo dados sensíveis, como a senha
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, mariateste1')
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido ', () => {
        cy.get('#username').type('mariatest@teste.com.br')
        cy.get('#password').type('422070g#hLX', { log: false }) //Protegendo dados sensíveis, como a senha
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });
    

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('mariateste1@teste.com.br')
        cy.get('#password').type('4663ffsc', { log: false }) //Protegendo dados sensíveis, como a senha
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error > li').should('contain', 'Erro: A senha fornecida para o e-mail mariateste1@teste.com.br está incorreta. Perdeu a senha?')
    });

    it('Deve exibir uma mensagem de envio de recuperação de senha', () => {
        cy.get('.lost_password > a').click()
        cy.get('#user_login').type('mariateste1@teste.com.br')
        cy.get('.woocommerce-Button').click()
        cy.get('.woocommerce-message').should('contain', 'O e-mail de redefinição de senha foi enviado.')
        
    });
});