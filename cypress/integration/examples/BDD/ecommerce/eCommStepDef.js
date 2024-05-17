import { Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../pageObjects/HomePage"
import ProductPage from "../../../pageObjects/ProductPage"
import CheckoutPage from "../../../pageObjects/CheckoutPage"

const homePage = new HomePage()
const productPage = new ProductPage()
const checkoutPage = new CheckoutPage()

let name;

beforeEach(function(){
    cy.fixture('example').then((data) =>{
        this.data = data
    })
})

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('url') + "/angularpractice/")
})

When('I add items to the cart', (dataTable) =>{
    homePage.getShopButton().click()
    dataTable.rawTable.forEach(function(element){
        cy.selectProduct(element)
    })
    productPage.getCheckoutButton().click()
})

Then('Validate the total prices', () =>{
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
})

Then('Select the country, submit and verify success message', () =>{
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

When('I fill the form details', function(dataTable){
    name = dataTable.rawTable[1][0]
    homePage.getNameEditbox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})

Then('Validate the form behavior', function(){
    homePage.getTwoWayDataBindingEditbox().should('have.value',name)
    homePage.getNameEditbox().should('have.attr','minlength','2')
    homePage.getEntrepreneurRadiobutton().should('be.disabled')
})

Then('click on the shop button', () =>{
    homePage.getShopButton().click()
})