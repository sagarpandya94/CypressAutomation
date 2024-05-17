class HomePage{

    getNameEditbox(){
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getTwoWayDataBindingEditbox(){
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getGender(){
        return cy.get('select')
    }

    getEntrepreneurRadiobutton(){
        return cy.get('#inlineRadio3')
    }

    getShopButton(){
        return  cy.get(':nth-child(2) > .nav-link')
    }
}

export default HomePage;