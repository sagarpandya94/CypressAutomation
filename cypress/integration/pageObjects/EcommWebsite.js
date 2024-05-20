class EcommWebsite{
    addToCartButton(){
        return cy.get(".card-body button:last-of-type")
    }

    cartButton(){
        return cy.get("[routerlink*='cart']")
    }

    checkoutButton(){
        return cy.contains("Checkout")
    }

    countryTextBox(){
        return cy.get("[placeholder*='Country']")
    }

    countryDropdown(){
        return cy.get(".ta-results button")
    }

    purchaseButton(){
        return cy.get(".action__submit")
    }

    downloadCSVButton(){
        return cy.get(".btn.btn-primary.mt-3.mb-3")
    }

    itemText(){
        return cy.get(".card-body b")
    }
}

export default EcommWebsite