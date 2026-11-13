  describe('Productos', () => {
  it('TC-API-03: GET /products responde con estructura y tipos de datos válidos', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/products`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array').and.not.be.empty;

      const primerProducto = response.body.data[0];
      
      expect(primerProducto.id).to.be.a('number');
      expect(primerProducto.name).to.be.a('string');
      expect(primerProducto.price).to.be.a('number');
      expect(primerProducto.is_eco_friendly).to.be.a('boolean');

      expect(primerProducto).to.have.property('brand');
      expect(primerProducto.brand).to.have.property('name').and.to.be.a('string');

      expect(primerProducto).to.have.property('category');
      expect(primerProducto.category).to.have.property('slug').and.to.be.a('string');
    });
  });

  it('TC-API-04: GET /products/{id} devuelve el detalle del producto', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/products`
      }).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        expect(listResponse.body.data).to.be.an('array').and.not.be.empty;

        const productId = listResponse.body.data[0].id;
        const productName = listResponse.body.data[0].name;

        cy.request({
          method: 'GET',
          url: `${apiUrl}/products/${productId}`
        }).then((detailResponse) => {
          expect(detailResponse.status).to.eq(200);
          expect(detailResponse.body).to.have.property('id', productId);
          expect(detailResponse.body).to.have.property('name', productName);
          expect(detailResponse.body).to.have.property('price');
          expect(detailResponse.body.price).to.be.a('number');
        });
      });
    });

  it('TC-API-05: GET /products/{id} inexistente devuelve 404', () => {
    const idInexistente = 1000;

    cy.request({
      method: 'GET',
      url: `${apiUrl}/products/${idInexistente}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('TC-API-06: GET /products?search=... filtra resultados correctamente', () => {
    const terminoBusqueda = 'brand';

    cy.request({
      method: 'GET',
      url: `${apiUrl}/products/search`, 
      qs: {
        q: terminoBusqueda
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');

      if (response.body.data.length > 0) {
        const primerResultado = response.body.data[0];
        const coincide = primerResultado.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
                         primerResultado.description.toLowerCase().includes(terminoBusqueda.toLowerCase());
        expect(coincide).to.be.true;
      }
    });
  });

  it('TC-API-07: GET /products?category_id=... filtra por categoría', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/products`
      }).then((listResponse) => {
        expect(listResponse.status).to.eq(200);
        expect(listResponse.body.data).to.be.an('array').and.not.be.empty;

        const categoryId = listResponse.body.data[0].category.id;

        cy.request({
          method: 'GET',
          url: `${apiUrl}/products`,
          qs: {
            category_id: categoryId
          }
        }).then((filterResponse) => {
          expect(filterResponse.status).to.eq(200);
          expect(filterResponse.body).to.have.property('data');
          expect(filterResponse.body.data).to.be.an('array');

          if (filterResponse.body.data.length > 0) {
            filterResponse.body.data.forEach((producto) => {
              expect(producto.category.id).to.eq(categoryId);
            });
          }
        });
      });
    });

  it('TC-API-08: Paginación de productos respeta page y per_page', () => {
      const paginaDeseada = 2;
      const elementosPorPagina = 4;

      cy.request({
        method: 'GET',
        url: `${apiUrl}/products`,
        qs: {
          page: paginaDeseada,
          per_page: elementosPorPagina
        }
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property('current_page', paginaDeseada);
        expect(response.body).to.have.property('per_page', elementosPorPagina);

        expect(response.body).to.have.property('data');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.length).to.be.at.most(elementosPorPagina);
      });
    });
  });