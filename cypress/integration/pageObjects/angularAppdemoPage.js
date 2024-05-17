class angularAppdemoPage{
    getLibraryButton(){
        return cy.get("button[class='btn btn-primary']")
    }

    getAlertText(){
        return cy.get('p')
    }
}

export default angularAppdemoPage;