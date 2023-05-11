it.only('Validando a pagina politica de privacidade', () => {
    cy.visit('./src/privacy.html')
    cy.contains('CAC TAT - Política de privacidade').should('be.visible')

})