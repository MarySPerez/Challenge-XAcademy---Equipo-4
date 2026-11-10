// Comando personalizado para buscar un producto
Cypress.Commands.add('buscarProducto', (nombreProducto) => {

    cy.get('[data-test="search-query"]')
        .type(nombreProducto);

    cy.get('[data-test="search-submit"]')
        .click();

});


// Comando personalizado para limpiar la búsqueda
Cypress.Commands.add('limpiarBusqueda', () => {

    cy.get('[data-test="search-reset"]').click();

});
