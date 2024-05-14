///<reference types="Cypress" />

describe('Alert window Suite', function(){
    it('Alert case 1',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        
        //Cypress auto handles alert and confirm alert window - this behavior cannot be changed
        cy.log('here')
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
    })

    it('Alert case 2', function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()

        //Cypress can fire events on the browser and if we want to capture the message on the alert box, then events should be used
        cy.on('window:alert', (str) =>{
            expect(str).to.equal("Hello , share this practice page and share your knowledge")
        })

        cy.on('window:confirm', (str) =>{
            expect(str).to.equal("Hello , Are you sure you want to confirm?")
        })
    })
})