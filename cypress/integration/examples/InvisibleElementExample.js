//<reference types="Cypress" />

describe('Invisible/Visible ElementSuite', function(){
    it('Case 1',function(){
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })
})