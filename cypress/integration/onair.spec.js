it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title()
        .should('eq','Samurai Barbershop by QAninja')
});

it('abrir site curso  cypress', () => {
    cy.visit('https://app.qaninja.com.br/')
});