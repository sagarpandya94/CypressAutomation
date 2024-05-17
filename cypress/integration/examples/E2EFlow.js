//<reference types="Cypress" />
import HomePage from "../pageObjects/HomePage"
import ProductPage from "../pageObjects/ProductPage"
import CheckoutPage from "../pageObjects/CheckoutPage"

describe('Framework Suite', function(){
    
    beforeEach(function(){
        cy.fixture('example').then((data) =>{
            this.data = data
        })
    })
    
    //Uses data from fixture file
    it('Simple case for the initial page',function(){
        const homePage = new HomePage()
        cy.visit(Cypress.env('url') + "/angularpractice/")
        homePage.getNameEditbox().type(this.data.name)
        homePage.getGender().select(this.data.gender)

        homePage.getTwoWayDataBindingEditbox().should('have.value',this.data.name)
        homePage.getNameEditbox().should('have.attr','minlength','2')
        homePage.getEntrepreneurRadiobutton().should('be.disabled')
    })


    // Uses a custom command
    it('E2E flow',function(){
        const homePage = new HomePage()
        const productPage = new ProductPage()
        const checkoutPage = new CheckoutPage()

        cy.visit(Cypress.env('url') + "/angularpractice/")
        homePage.getShopButton().click()
        this.data.productName.forEach(function(element){
            cy.selectProduct(element)
        })
        productPage.getCheckoutButton().click()

        var expectedTotal=0;
        checkoutPage.getAmountColumn().each(($el,index,$list) =>{
            const amount =$el.text()
            var res = amount.split(" ")
            res = res[1].trim()
            expectedTotal = Number(expectedTotal) + Number(res)
        }).then(function(){
            cy.log(expectedTotal)
        })

        var finalTotal=0;
        checkoutPage.getTotalAmount().then(function(element){
            const totalAmount = element.text()
            var res = totalAmount.split(" ")
            finalTotal = res[1].trim()
            expect(Number(finalTotal)).to.equal(expectedTotal)
        })

        checkoutPage.getCheckoutButton().click()
        checkoutPage.getCountryTextbox().type('United States of America')
        Cypress.config("defaultCommandTimeout", 8000)
        checkoutPage.getCountryDropdown().click()
        checkoutPage.getTermsCheckbox().check({force:true})
        checkoutPage.getPurchaseButton().click()
        //checkoutPage.getAlertTextarea().contains('Success')

        checkoutPage.getAlertTextarea().then(function(el){
            expect(el.text().includes("Success")).to.be.true
        })
    })
})