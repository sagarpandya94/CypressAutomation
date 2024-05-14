///<reference types="Cypress" />

describe('Radiobutton Suite', function(){
    it('Case 1',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('[value="radio3"]').click().should('be.checked')
    })
})