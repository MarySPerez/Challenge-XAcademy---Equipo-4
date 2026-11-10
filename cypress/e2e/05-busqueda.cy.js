
describe('Módulo: Búsqueda de productos', () => {

    beforeEach(() => {
        cy.visit('https://with-bugs.practicesoftwaretesting.com/');
    });

    // BUS-001: Búsqueda por nombre completo
    it('BUS-001 - Buscar producto por nombre completo', () => {

        cy.fixture('busqueda').then((datos) => {

            cy.buscarProducto(datos.busquedaCompleta);

            // El campo debe quedar vacío después de buscar
            cy.get('[data-test="search-query"]')
                .should('have.value', '');

            // Verificar los nombres de las tarjetas visibles
            cy.get('a.card[data-test^="product-"]')
                .filter(':visible')
                .should(($tarjetas) => {

                    const nombres = [...$tarjetas].map((tarjeta) => {
                        return tarjeta.querySelector('[data-test="product-name"]')
                            .textContent.trim().toLowerCase();
                    });

                    expect(nombres.length).to.be.greaterThan(0);

                    nombres.forEach((nombre) => {
                        expect(nombre).to.include(
                            datos.busquedaCompleta.toLowerCase()
                        );
                    });

                });

        });

    });

    // BUS-002: Búsqueda por nombre parcial
    it('BUS-002 - Buscar producto por nombre parcial', () => {

        cy.fixture('busqueda').then((datos) => {

            cy.buscarProducto(datos.busquedaParcial);

            // El campo debe quedar vacío después de buscar
            cy.get('[data-test="search-query"]')
                .should('have.value', '');

            // Verificar los nombres de las tarjetas visibles
            cy.get('a.card[data-test^="product-"]')
                .filter(':visible')
                .should(($tarjetas) => {

                    const nombres = [...$tarjetas].map((tarjeta) => {
                        return tarjeta.querySelector('[data-test="product-name"]')
                            .textContent.trim().toLowerCase();
                    });

                    expect(nombres.length).to.be.greaterThan(0);

                    nombres.forEach((nombre) => {
                        expect(nombre).to.include(
                            datos.busquedaParcial.toLowerCase()
                        );
                    });

                });

        });

    });


    // BUS-003: Búsqueda con letras mayúsculas
    it('BUS-003 - Buscar producto con letras mayúsculas', () => {

        cy.fixture('busqueda').then((datos) => {

            cy.buscarProducto(datos.busquedaMayusculas);

            // El campo debe quedar vacío después de buscar
            cy.get('[data-test="search-query"]')
                .should('have.value', '');

            // Verificar los nombres de las tarjetas visibles
            cy.get('a.card[data-test^="product-"]')
                .filter(':visible')
                .should(($tarjetas) => {

                    const nombres = [...$tarjetas].map((tarjeta) => {
                        return tarjeta.querySelector('[data-test="product-name"]')
                            .textContent.trim().toLowerCase();
                    });

                    expect(nombres.length).to.be.greaterThan(0);

                    nombres.forEach((nombre) => {
                        expect(nombre).to.include(
                            datos.busquedaMayusculas.toLowerCase()
                        );
                    });

                });

        });

    });


    // BUS-004: Búsqueda con letras minúsculas
    it('BUS-004 - Buscar producto con letras minúsculas', () => {

        cy.fixture('busqueda').then((datos) => {

            cy.buscarProducto(datos.busquedaMinusculas);

            // El campo debe quedar vacío después de buscar
            cy.get('[data-test="search-query"]')
                .should('have.value', '');

            // Verificar los nombres de las tarjetas visibles
            cy.get('a.card[data-test^="product-"]')
                .filter(':visible')
                .should(($tarjetas) => {

                    const nombres = [...$tarjetas].map((tarjeta) => {
                        return tarjeta.querySelector('[data-test="product-name"]')
                            .textContent.trim().toLowerCase();
                    });

                    expect(nombres.length).to.be.greaterThan(0);

                    nombres.forEach((nombre) => {
                        expect(nombre).to.include(
                            datos.busquedaMinusculas.toLowerCase()
                        );
                    });

                });

        });

    });


});
