///<reference types="Cypress" />
import angularAppdemoPage from "../pageObjects/angularAppdemoPage"

describe('API Intercept Suite', function(){
    it('Mock request',function(){
        const angularappdemoPage = new angularAppdemoPage()
        cy.visit(Cypress.env('url')+"/angularAppdemo/")

        cy.intercept(
            'GET',
            'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
                req.continue((res)=>{
                    //expect(res.statusCode.to.equal(403))
                })
            }
        ).as("secondAuthor")
       
        angularappdemoPage.getLibraryButton().click()
        cy.wait('@secondAuthor')
    })
})