/// <reference types="cypress" />

describe('Funcionalidade Página de Produtos', () => {

    beforeEach(() => {
        cy.visit("http://lojaebac.ebaconline.art.br/produtos/");
      });

      it('Deve selecionar um produto da lista', () => {
        cy.get('[class="product-block grid"]')
      //.first()
      //.last()
      .eq(5).should('contain', 'Arcadio Gym Short')
      //.contains("Arcadio Gym Short")
      .click();
          
      });

      it.only('Deve selecionar um produto no carrinho', () => {
        var quantidade = 7

        cy.get('[class="product-block grid"]')
        .contains("Apollo Running Short").click()
        cy.get('.button-variable-item-34').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
    
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Apollo Running Short” foram adicionados no seu carrinho.')

      });

});