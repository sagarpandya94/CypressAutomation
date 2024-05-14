//cypress spec file or test file
/// <reference types="Cypress" />

describe('First test suite', function(){
    it('first test case',function(){
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        //cy.get('.product:visible').should('have.length',4)

        //Aliasing - instead of using a variable - coz aliasing works in Cypress but storing in variable will add the trouble of resolving promise
        cy.get('.products').as('productLocator')

        //cy.get('.products').find('.product').should('have.length',4)
        cy.get('@productLocator').find('.product').should('have.length',4)

        //cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
        cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()

//      cy.get('.products').find('.product').each(($e1, index, $list) => {

        cy.get('@productLocator').find('.product').each(($e1, index, $list) => {
            const productName = $e1.find('h4.product-name').text()
            if(productName.includes('Cashews')){
                cy.wrap($e1).find('button').click()
            }
        })

        //Example of resolving promise by ourselves - required when trying to use non cypress commands
        //Cypress is asynchronous in nature (like Javascript by default) - but Cypress team has written wrappers to make it synchronous
        //So when any test case is executed, all the commands are enqueued first and then executed when test case exits
        //.text() is jquery method and not cypress function, hence we need to resolve it ourselves
        //We resolve a promise using .then()

        cy.get('.brand').then(function(logoElement)
        {
            cy.log(logoElement.text())
        })

        //the above assertion can be simple if we use cypress + chai
        cy.get('.brand').should('have.text','GREENKART')
    })
})