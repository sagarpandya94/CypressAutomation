///<reference types="Cypress" />

describe('Child window Suite', function(){
    it('Child window case 1',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        // Use jquery removeAttr function to alter the dom (remove target attribute)
        cy.get('#opentab').invoke('removeAttr','target').click()

        //Try to click a button on this page
        //This command will not work because we are moving away from the origin domain -> means we are navigating from abc.com to xyz.com
        //If this href was going from abc.com/1 to abc.vom/2 then it would have worked 
        // Not working -> cy.get('#navbarSupportedContent a[href*="about"]').click()

        //The workaround is to explicitly mention the change of domain as follows

        cy.origin("https://www.qaclickacademy.com", () => {
            cy.get('#navbarSupportedContent a[href*="about"]').click()
            cy.get(".mt-50 h2").should('contain','QAClick Academy')
        })
    })

    it('Child window case 2',function(){
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')

        //We can also extract the href content as follows
        //prop is a jquery method which returns value of the property mentioned
        cy.get('#opentab').then((el) => {
            const url = el.prop('href')
            cy.visit(url)
            cy.origin(url, () => {
                cy.get("div.sub-menu-bar a[href*='about']").click()
            })
        })
    })
})