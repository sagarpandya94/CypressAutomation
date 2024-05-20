///<reference types="Cypress" />

//The URL is npnfunctioning at this point
describe('No UI - pure API suite', function(){
    it('Post call',function(){
        cy.request('POST', 'http://216.10.245.160/Library/Addbook.php', {
            "name":"New book1",
            "isbn":"wowteach",
            "aisle":"934",
            "author":"hmmm"
        }).then(function(res){
            expect(res.body).to.have.property("Msg","successfully added")
        })
    })
})