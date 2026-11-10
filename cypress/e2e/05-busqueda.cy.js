describe("Módulo: Búsqueda de productos", () => {
  beforeEach(() => {
    cy.visit("https://with-bugs.practicesoftwaretesting.com/");
  });

  // BUS-001: Búsqueda por nombre completo
  it("BUS-001 - Buscar producto por nombre completo", () => {
    cy.fixture("busqueda").then((datos) => {
      cy.buscarProducto(datos.busquedaCompleta);

      // El campo debe quedar vacío después de buscar
      cy.get('[data-test="search-query"]').should("have.value", "");

      // Verificar los nombres de las tarjetas visibles
      cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should(($tarjetas) => {
          const nombres = [...$tarjetas].map((tarjeta) => {
            return tarjeta
              .querySelector('[data-test="product-name"]')
              .textContent.trim()
              .toLowerCase();
          });

          expect(nombres.length).to.be.greaterThan(0);

          nombres.forEach((nombre) => {
            expect(nombre).to.include(datos.busquedaCompleta.toLowerCase());
          });
        });
    });
  });

  // BUS-002: Búsqueda por nombre parcial
  it("BUS-002 - Buscar producto por nombre parcial", () => {
    cy.fixture("busqueda").then((datos) => {
      cy.buscarProducto(datos.busquedaParcial);

      // El campo debe quedar vacío después de buscar
      cy.get('[data-test="search-query"]').should("have.value", "");

      // Verificar los nombres de las tarjetas visibles
      cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should(($tarjetas) => {
          const nombres = [...$tarjetas].map((tarjeta) => {
            return tarjeta
              .querySelector('[data-test="product-name"]')
              .textContent.trim()
              .toLowerCase();
          });

          expect(nombres.length).to.be.greaterThan(0);

          nombres.forEach((nombre) => {
            expect(nombre).to.include(datos.busquedaParcial.toLowerCase());
          });
        });
    });
  });

  // BUS-003: Búsqueda con letras mayúsculas
  it("BUS-003 - Buscar producto con letras mayúsculas", () => {
    cy.fixture("busqueda").then((datos) => {
      cy.buscarProducto(datos.busquedaMayusculas);

      // El campo debe quedar vacío después de buscar
      cy.get('[data-test="search-query"]').should("have.value", "");

      // Verificar los nombres de las tarjetas visibles
      cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should(($tarjetas) => {
          const nombres = [...$tarjetas].map((tarjeta) => {
            return tarjeta
              .querySelector('[data-test="product-name"]')
              .textContent.trim()
              .toLowerCase();
          });

          expect(nombres.length).to.be.greaterThan(0);

          nombres.forEach((nombre) => {
            expect(nombre).to.include(datos.busquedaMayusculas.toLowerCase());
          });
        });
    });
  });

  // BUS-004: Búsqueda con letras minúsculas
  it("BUS-004 - Buscar producto con letras minúsculas", () => {
    cy.fixture("busqueda").then((datos) => {
      cy.buscarProducto(datos.busquedaMinusculas);

      // El campo debe quedar vacío después de buscar
      cy.get('[data-test="search-query"]').should("have.value", "");

      // Verificar los nombres de las tarjetas visibles
      cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should(($tarjetas) => {
          const nombres = [...$tarjetas].map((tarjeta) => {
            return tarjeta
              .querySelector('[data-test="product-name"]')
              .textContent.trim()
              .toLowerCase();
          });

          expect(nombres.length).to.be.greaterThan(0);

          nombres.forEach((nombre) => {
            expect(nombre).to.include(datos.busquedaMinusculas.toLowerCase());
          });
        });
    });
  });

  // BUS-011: Ordenar productos por nombre A-Z
  it("BUS-011 - Ordenar productos por nombre A-Z", () => {
    cy.get('[data-test="sort"]').select("name,desc");

    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        const nombres = [...$tarjetas].map((tarjeta) => {
          return tarjeta
            .querySelector('[data-test="product-name"]')
            .textContent.trim()
            .toLowerCase();
        });

        const nombresOrdenados = [...nombres].sort();

        expect(nombres).to.deep.equal(nombresOrdenados);
      });
  });

  // BUS-012: Ordenar productos por nombre Z-A
  it("BUS-012 - Ordenar productos por nombre Z-A", () => {
    cy.get('[data-test="sort"]').select("name,asc");

    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        const nombres = [...$tarjetas].map((tarjeta) => {
          return tarjeta
            .querySelector('[data-test="product-name"]')
            .textContent.trim()
            .toLowerCase();
        });

        const nombresOrdenados = [...nombres].sort().reverse();

        expect(nombres).to.deep.equal(nombresOrdenados);
      });
  });

  // BUS-013: Verificar rango de precios predeterminado
  it("BUS-013 - Verificar rango de precios predeterminado", () => {
    // Verificar precio mínimo inicial
    cy.get(".ngx-slider-pointer-min").should("have.attr", "aria-valuenow", "1");

    // Verificar precio máximo inicial
    cy.get(".ngx-slider-pointer-max").should(
      "have.attr",
      "aria-valuenow",
      "100",
    );

    // Verificar que los precios de las tarjetas visibles
    // estén comprendidos entre 1 y 100
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        expect($tarjetas.length).to.be.greaterThan(0);

        [...$tarjetas].forEach((tarjeta) => {
          const elementoPrecio = tarjeta.querySelector(
            '[data-test="product-price"]',
          );

          expect(elementoPrecio).to.exist;

          const precio = Number(
            elementoPrecio.textContent.replace("$", "").trim(),
          );

          expect(precio).to.be.at.least(1);
          expect(precio).to.be.at.most(100);
        });
      });
  });

  // BUS-014: Modificar precio mínimo
  it("BUS-014 - Modificar precio mínimo", () => {
    // Cambiar el precio mínimo de 1 a 50
    cy.get(".ngx-slider-pointer-min").focus().type("{rightarrow}".repeat(49));

    // Verificar que el mínimo sea 50
    cy.get(".ngx-slider-pointer-min").should(
      "have.attr",
      "aria-valuenow",
      "50",
    );

    cy.wait(1000);

    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should("have.length.greaterThan", 0);

    // Verificar que los productos estén dentro del rango 50 a 100
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        expect($tarjetas.length).to.be.greaterThan(0);

        [...$tarjetas].forEach((tarjeta) => {
          const elementoPrecio = tarjeta.querySelector(
            '[data-test="product-price"]',
          );

          const precio = Number(
            elementoPrecio.textContent.replace("$", "").trim(),
          );

          expect(precio).to.be.at.least(50);
          expect(precio).to.be.at.most(100);
        });
      });
  });

  // BUS-015: Modificar precio máximo
  it("BUS-015 - Modificar precio máximo", () => {
    // Cambiar el precio máximo de 100 a 150
    cy.get(".ngx-slider-pointer-max").focus().type("{rightarrow}".repeat(50));

    // Verificar que el máximo sea 150
    cy.get(".ngx-slider-pointer-max").should(
      "have.attr",
      "aria-valuenow",
      "150",
    );

    // Verificar que los productos estén dentro del rango 1 a 150
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        [...$tarjetas].forEach((tarjeta) => {
          const elementoPrecio = tarjeta.querySelector(
            '[data-test="product-price"]',
          );

          const precio = Number(
            elementoPrecio.textContent.replace("$", "").trim(),
          );

          expect(precio).to.be.at.least(1);
          expect(precio).to.be.at.most(150);
        });
      });

    // Bajar el precio máximo de 150 a 10
    cy.get(".ngx-slider-pointer-max")
      .focus()
      .type("{leftarrow}".repeat(70), { delay: 100 });

    // Bajar el precio máximo de 150 a 140
    // cy.get('.ngx-slider-pointer-max')
    //     .focus()
    //     .type('{leftarrow}'.repeat(70));

    // cy.get('.ngx-slider-pointer-max')
    //     .should('have.attr', 'aria-valuenow', '140');

    // Verificar que el máximo sea 10
    cy.get(".ngx-slider-pointer-max").should(
      "have.attr",
      "aria-valuenow",
      "10",
    );

    // Verificar que ningún producto supere el máximo de 10
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        [...$tarjetas].forEach((tarjeta) => {
          const elementoPrecio = tarjeta.querySelector(
            '[data-test="product-price"]',
          );

          const precio = Number(
            elementoPrecio.textContent.replace("$", "").trim(),
          );

          expect(precio).to.be.at.most(10);
        });
      });
  });

  // BUS-016: Ordenar productos por precio de menor a mayor
  it("BUS-016 - Ordenar productos por precio de menor a mayor", () => {
    cy.get('[data-test="sort"]').select("price,desc");

    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        const precios = [...$tarjetas].map((tarjeta) => {
          const elemento = tarjeta.querySelector('[data-test="product-price"]');
          return Number(elemento.textContent.replace("$", "").trim());
        });

        const preciosOrdenados = [...precios].sort((a, b) => a - b);

        expect(precios).to.deep.equal(preciosOrdenados);
      });
  });

  // BUS-017: Ordenar productos por precio de mayor a menor
  it("BUS-017 - Ordenar productos por precio de mayor a menor", () => {
    cy.get('[data-test="sort"]').select("price,asc");

    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {
        const precios = [...$tarjetas].map((tarjeta) => {
          const elemento = tarjeta.querySelector('[data-test="product-price"]');
          return Number(elemento.textContent.replace("$", "").trim());
        });

        const preciosOrdenados = [...precios].sort((a, b) => b - a);

        expect(precios).to.deep.equal(preciosOrdenados);
      });
  });


  // BUS-019: Filtrar por una categoría
  it("BUS-019 - Filtrar por una categoría", () => {

    // Seleccionar la categoría Hammer
    cy.get('[data-test="category-3"]').check();

    // Verificar que la categoría quedó seleccionada
    cy.get('[data-test="category-3"]').should("be.checked");

    // Verificar los productos mostrados
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should(($tarjetas) => {

        expect($tarjetas.length).to.be.greaterThan(0);

        [...$tarjetas].forEach((tarjeta) => {
          const nombre = tarjeta
            .querySelector('[data-test="product-name"]')
            .textContent.trim()
            .toLowerCase();

          expect(nombre).to.include("hammer");
        });

      });
  });  



  // BUS-020: Seleccionar varias categorías
  it("BUS-020 - Seleccionar varias categorías", () => {

    cy.contains("label", "Hammer")
      .find('input[name="category_id"]')
      .check();

    cy.contains("label", "Hand Saw")
      .find('input[name="category_id"]')
      .check();

    // Verificar que ambas categorías estén seleccionadas
    cy.contains("label", "Hammer")
      .find('input[name="category_id"]')
      .should("be.checked");

    cy.contains("label", "Hand Saw")
      .find('input[name="category_id"]')
      .should("be.checked");

    // Verificar que existan resultados
    cy.get('a.card[data-test^="product-"]')
      .filter(":visible")
      .should("have.length.greaterThan", 0);

  });


// BUS-021: Desmarcar una categoría seleccionada
it("BUS-021 - Desmarcar una categoría seleccionada", () => {

    // Seleccionar Hammer
    cy.get('[data-test="category-3"]').check();
    cy.get('[data-test="category-3"]').should("be.checked");
    cy.wait(1500);

    // Comprobar que hay resultados
    cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should("have.length.greaterThan", 0);

    // Desmarcar Hammer
    cy.get('[data-test="category-3"]').uncheck();
    cy.get('[data-test="category-3"]').should("not.be.checked");
    cy.wait(1500);

    // Esperar la actualización del catálogo
    cy.wait(1000);

    // Comprobar que vuelven a aparecer productos
    cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .should("have.length.greaterThan", 0);

});


it("BUS-023 - Filtrar productos por Brand Name 1", () => {
  cy.get('[data-test="brand-1"]').check();
  cy.get('[data-test="brand-1"]').should("be.checked");

  cy.wait(1000);

  cy.get('a.card[data-test^="product-"]').filter(":visible").then(($tarjetas) => {
    const enlaces = [...$tarjetas].map((tarjeta) =>
      tarjeta.getAttribute("href")
    );

    expect(enlaces.length).to.be.greaterThan(0);

    cy.wrap(enlaces).each((enlace) => {
      cy.visit("https://with-bugs.practicesoftwaretesting.com/" + enlace);

      cy.get('.badge[aria-label="brand"]')
        .should("contain.text", "Brand name 1");
    });
  });

  // Volver al catálogo con el filtro aplicado
  cy.visit("https://with-bugs.practicesoftwaretesting.com/");
  cy.get('[data-test="brand-1"]').check();
  cy.wait(1500);

  cy.get('[data-test="brand-1"]').should("be.checked");
  cy.get('a.card[data-test^="product-"]')
    .filter(":visible")
    .should("have.length.greaterThan", 0);
});


it("BUS-024 - Filtrar productos por Brand Name 2", () => {
  cy.get('[data-test="brand-2"]').check();
  cy.get('[data-test="brand-2"]').should("be.checked");

  cy.wait(1000);

  cy.get('a.card[data-test^="product-"]').filter(":visible").then(($tarjetas) => {
    const enlaces = [...$tarjetas].map((tarjeta) =>
      tarjeta.getAttribute("href")
    );

    expect(enlaces.length).to.be.greaterThan(0);

    cy.wrap(enlaces).each((enlace) => {
      cy.visit("https://with-bugs.practicesoftwaretesting.com/" + enlace);

      cy.get('.badge[aria-label="brand"]')
        .should("contain.text", "Brand name 2");
    });
  });

  // Volver al catálogo con el filtro aplicado
  cy.visit("https://with-bugs.practicesoftwaretesting.com/");
  cy.get('[data-test="brand-2"]').check();
  cy.wait(1500);

  cy.get('[data-test="brand-2"]').should("be.checked");
  cy.get('a.card[data-test^="product-"]')
    .filter(":visible")
    .should("have.length.greaterThan", 0);
});



it("BUS-025 - Desmarcar una marca", () => {
  cy.get('a.card[data-test^="product-"]')
    .filter(":visible")
    .then(($iniciales) => {
      const productosIniciales = [...$iniciales]
        .map((tarjeta) => tarjeta.getAttribute("data-test"))
        .sort();

      cy.get('[data-test="brand-1"]').check();
      cy.wait(1500);

      cy.get('[data-test="brand-1"]').uncheck();
      cy.wait(1500);

      cy.get('[data-test="brand-1"]').should("not.be.checked");

      cy.get('a.card[data-test^="product-"]')
        .filter(":visible")
        .then(($finales) => {
          const productosFinales = [...$finales]
            .map((tarjeta) => tarjeta.getAttribute("data-test"))
            .sort();

          expect(productosFinales).to.deep.equal(productosIniciales);
        });
    });
});



it("BUS-026 - Mostrar solamente productos ecológicos", () => {
  cy.get('[data-test="eco-friendly-filter"]').check();
  cy.get('[data-test="eco-friendly-filter"]').should("be.checked");

  cy.wait(1500);

  cy.get('a.card[data-test^="product-"]')
    .filter(":visible")
    .should("have.length.greaterThan", 0)
    .each(($tarjeta) => {
      cy.wrap($tarjeta)
        .find('[data-test="eco-badge"]')
        .should("exist");
    });
});



it("BUS-027 - Desactivar el filtro de productos ecológicos", () => {
  // Activar el filtro ecológico
  cy.get('[data-test="eco-friendly-filter"]').check();
  cy.wait(1500);

  // Comprobar que está activado
  cy.get('[data-test="eco-friendly-filter"]').should("be.checked");

  // Desactivar el filtro
  cy.get('[data-test="eco-friendly-filter"]').uncheck();
  cy.wait(1500);

  // Comprobar que quedó desactivado
  cy.get('[data-test="eco-friendly-filter"]').should("not.be.checked");

  // Comprobar que vuelven a aparecer productos
  cy.get('a.card[data-test^="product-"]')
    .filter(":visible")
    .should("have.length.greaterThan", 0);
});




it("BUS-039 - Verificar que el catálogo general incluya productos de alquiler", () => {

  // El catálogo general debe incluir los productos de alquiler
  cy.get('a.card[data-test^="product-"]').filter(":visible")
    .should(($tarjetas) => {
      const nombres = [...$tarjetas].map((tarjeta) =>
        tarjeta.querySelector('[data-test="product-name"]').textContent.trim().toLowerCase()
      );

      expect(nombres).to.include("excavator");
      expect(nombres).to.include("bulldozer");
      expect(nombres).to.include("crane");
    });

});




});
