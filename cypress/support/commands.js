Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Cíntia').should('have.value', 'Cíntia')
    cy.get('#lastName').type('Silva Galvao').should('have.value','Silva Galvao')
    cy.get('#email').type('cintia@gmail.com').should('have.value', 'cintia@gmail.com')
    cy.get('#phone').type('6298989898').should('have.value','6298989898')
    cy.get('#product').select('Blog').should('have.value', 'blog')
    cy.get('#open-text-area').type('oi comando costumizado')
    cy.get('button[type="submit"]').click()
})



