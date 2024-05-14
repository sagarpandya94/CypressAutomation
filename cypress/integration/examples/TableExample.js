///<reference types="Cypress" />

describe('Table Suite', function(){
    it('Check Price',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('tr td:nth-child(2)').each($cell => {
            const text = $cell.text();
            if (text.includes('Python')) {
              cy.wrap($cell).next().should('have.text', '25')
            }
          })
    })
})