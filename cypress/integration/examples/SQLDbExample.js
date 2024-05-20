//<reference types="Cypress" />

describe('SQLDb Suite', function(){
    it('Select table case',function(){
        cy.sqlServer("select * from Persons").then(function(result){
            cy.log(result[0][3])
        })
    })
})