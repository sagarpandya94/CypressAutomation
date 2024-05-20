///<reference types="Cypress" />

import EcommWebsite from "../pageObjects/EcommWebsite"

const neatCSV = require('neat-csv')

// We bypass the login screen in below test case by setting the jwt token in the window
//onBeforeLoad is js thing, not cypress thing
describe('JWT Token session Suite', function(){
    it('Login',function(){
        cy.LoginAPI().then(function(){
            cy.visit(Cypress.env('url')+"/client/", {
                onBeforeLoad: function(window) {
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })
    })

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
            if($el.text() === 'Click To Download Order Details in CSV'){
                cy.wrap($el).click()
            }  
        })

        cy.readFile(Cypress.config("fileServerFolder")+"\\cypress\\downloads\\order-invoice_sam411.csv").then(async function(text){
            const csv = await neatCSV(text)
            expect(productName).to.equal(csv[0]["Product Name"])
        })
        
    })
})