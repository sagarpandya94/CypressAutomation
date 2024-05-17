//<reference types="Cypress" />

describe('Dummy Dropdown Suite', function(){
    it('Static dropdown case 1',function(){
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('select').select('option2').should('have.value','option2')

    })

    it('Dynamic dropdown case 1',function(){
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($e1,index,$list) =>{
            if($e1.text()==="Indonesia"){
                cy.wrap($e1).click()
            }
        })
        cy.get('#autocomplete').should('have.value','Indonesia')
    })
})