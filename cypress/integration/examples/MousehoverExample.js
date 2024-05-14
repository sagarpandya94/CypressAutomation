///<reference types="Cypress" />

//Mouse hover is not directly supported by cypress so we use jquery function for this

describe('Mousehover Suite', function(){
    it('Case 1',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //Show function mimics the behavior of mouse hover action
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')
        
    })

    it('Case 2',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // force:true is used to click on hidden elements, so no mouse hovering but clicking on the button directly from dom
        cy.contains('Top').click({force:true})
        cy.url().should('include','top')
        
    })
})