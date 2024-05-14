///<reference types="Cypress" />

describe('Calendar Suite', function(){
    it('Selecting date and asserting it is as expected',function(){

        const month = "6"
        const date = "20"
        const year = "2025"
        const expectedDate = [month, date, year]

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers")
        cy.get(".react-date-picker__inputGroup").click()
        cy.get(".react-calendar__navigation__label").click()
        cy.get(".react-calendar__navigation__label").click()

        cy.contains("button", year).click()
        //This is because UI has month NAMES and we have MONTH numbers
        cy.get(".react-calendar__year-view__months__month").eq(Number(month)-1).click()
        cy.contains("abbr",date).click()

        cy.get(".react-date-picker__inputGroup__input").each(($el,index)=>{
            cy.wrap($el).invoke('val').should('eq',expectedDate[index])
        })
    })
})