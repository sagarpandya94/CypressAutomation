// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('selectProduct', (productName) =>{
    cy.get('h4.card-title').each(($e1,index) =>{
        if($e1.text().includes(productName)){
            cy.get('button.btn.btn-info').eq(index).click() 
        }

    })
})

Cypress.Commands.add('LoginAPI', () => {
    cy.request('POST','https://rahulshettyacademy.com/api/ecom/auth/login',{userEmail: "sam411@gmail.com", userPassword: "Hello@123"}).
    then(function(response){
        expect(response.status).to.equal(200)
        Cypress.env('token',response.body.token)
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })