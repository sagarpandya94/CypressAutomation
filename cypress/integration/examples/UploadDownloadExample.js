//<reference types="Cypress" />

describe('Download, edit and upload excel suite', function(){
    it('Case 1',function(){

        const replaceNum = 350;
        const searchTextFruit = "Apple";
        cy.visit(Cypress.env('url')+"/upload-download-test/index.html")
        cy.get('#downloadButton').click()
        const filePath1 = Cypress.config("fileServerFolder")+"\\cypress\\downloads\\download.xlsx"

        cy.task('writeExcelTest',{searchText:searchTextFruit, replaceText:replaceNum, change:{rowChange:0,colChange:2},filePath: filePath1 })

        cy.get('#fileinput').selectFile(filePath1)

        cy.contains(searchTextFruit).parent().parent().find("#cell-4-undefined").should('have.text','350')


    })
})