//cypress spec file or test file
/// <reference types="Cypress" />

describe('E2E checkout', function(){
    it('Add + Checkout',function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        //cy.get('.product:visible').should('have.length',4)

        //Aliasing - instead of using a variable - coz aliasing works in Cypress but storing in variable will add the trouble of resolving promise
        cy.get('.products').as('productLocator')
        
        cy.get('@productLocator').find('.product').each(($e1, index, $list) => {
            const productName = $e1.find('h4.product-name').text()
            if(productName.includes('Cashews')){
                cy.wrap($e1).find('button').click()
            }
        })

        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.get('button').contains('Place Order').click()
    })
})