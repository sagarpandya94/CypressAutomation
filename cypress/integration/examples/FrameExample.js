///<reference types="Cypress" />
///<reference types="cypress-iframe" />

//Requires to install a plugin for iframe npm -install -d cypress-iframe
import 'cypress-iframe'

describe('Frame Suite', function(){
    it('Case 1',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.frameLoaded("#courses-iframe")
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.wait(8000)
        cy.iframe().find("h1[class*='pricing-title']").as('pricing')
        cy.get('@pricing').should('have.length',2)   
    })
})