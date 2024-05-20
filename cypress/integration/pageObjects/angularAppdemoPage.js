class angularAppdemoPage{
    getLibraryButton(){
        return cy.get("button[class='btn btn-primary']")
    }

    getAlertText(){
        return cy.get('p')
    }

    getRows(){
        return cy.get('tr')
    }
}

export default angularAppdemoPage;