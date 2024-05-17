///<reference types="Cypress" />
import angularAppdemoPage from "../pageObjects/angularAppdemoPage"


// The url below is responding with more than 1 books, but we see the message only when we have one book left
// Hence we are mocking the response - return only 1 book in the response
// This way the message will be displayed always and we can verify the message
// It is kind of an edge case
describe('API Intercept Suite', function(){
    it('Mockresponse',function(){

        const angularappdemoPage = new angularAppdemoPage()

        cy.visit(Cypress.env('url')+"/angularAppdemo/")

        

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [
                {
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"
                }
            ]
        }).as('bookretrievals')

        angularappdemoPage.getLibraryButton().click()
        cy.wait('@bookretrievals')
        angularappdemoPage.getAlertText().should('have.text','Oops only 1 Book available')
    })
})