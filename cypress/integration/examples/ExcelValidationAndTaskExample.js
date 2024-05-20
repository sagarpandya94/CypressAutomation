///<reference types="Cypress" />


import EcommWebsite from "../pageObjects/EcommWebsite"

// We bypass the login screen in below test case by setting the jwt token in the window
//onBeforeLoad is js thing, not cypress thing
describe('Excel Validation and Task Suite', function(){
    let productName;
    it('E2E Flow with CSV Download', async function(){
        cy.LoginAPI().then(function(){
            cy.visit(Cypress.env('url')+"/client/", {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })

        const ecommwebsite = new EcommWebsite

        ecommwebsite.itemText().eq(1).then(($el)=>{
            productName = $el.text()
        })
        ecommwebsite.addToCartButton().eq(1).click()
        ecommwebsite.cartButton().click()
        ecommwebsite.checkoutButton().click()
        ecommwebsite.countryTextBox().type("ind")

        ecommwebsite.countryDropdown().each(($el, index, $list) => {
            if($el.text() === ' India'){
                cy.wrap($el).click({force: true})
            }
        })

        ecommwebsite.purchaseButton().click()
        cy.wait(2000)
        ecommwebsite.downloadCSVButton().each(($el) => {
            if($el.text() === 'Click To Download Order Details in Excel'){
                cy.wrap($el).click()
            }  
        })

        //The task is used to run stuff on node engine
        //By default, everything is running on cypress engine or the browser
        //Coversion of excel to json requires fs - which is a node thing
        //So without tasks, any fs function will not be recognized by cypress and will throw function unknown error
        //The tasks are defined in cypress.config.js file
        const filePath = Cypress.config("fileServerFolder")+"\\cypress\\downloads\\order-invoice_sam411.xlsx"
        cy.task('excelToJsonTask',filePath).then(function(res){
            cy.log(res)
            expect(productName).to.equal(res.data[1].B)
        })

        //The above code verifies that product name is exactly in column B - which is the correct way of doing it

        //But if we want to verify only that the productname is present somewhere in the file then that is easier like follow

        cy.readFile(filePath).then(function(xlcontent){
            expect(xlcontent).to.include(productName)
        })
        
    })
})