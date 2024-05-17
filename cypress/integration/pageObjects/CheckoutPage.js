class CheckoutPage{

    getCountryTextbox(){
        return cy.get('#country')

    }

    getCountryDropdown(){
        return cy.get('.suggestions')
    }

    getTermsCheckbox(){
        return cy.get('#checkbox2')
    }

    getPurchaseButton(){
        return cy.get('.btn.btn-success')
    }

    getAlertTextarea(){
        return cy.get('.alert')
    }

    getCheckoutButton(){
        return cy.contains('Checkout')
    }
    
    getAmountColumn(){
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalAmount(){
        return cy.get('h3 strong')
    }
}

export default CheckoutPage