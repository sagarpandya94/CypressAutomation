//<reference types="Cypress" />

describe('Radiobutton Suite', function(){
    it('Case 1',function(){
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('[value="radio3"]').click().should('be.checked')
    })
})