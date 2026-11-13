describe('Pruebas de API - Practice Software Testing', () => {
  const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

  it('TC-API-01: Obtener la lista de productos y verificar que responde correctamente y no está vacía', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/products`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    });
  });

  it('TC-API-02: Iniciar sesión por API con el usuario de prueba y verificar que devuelve un token de acceso', () => {
      // Apuntamos al archivo 'api' (que corresponde a api.json)
      cy.fixture('api').then((data) => {
        // Como tu fixture es un array, filtramos o buscamos el objeto por test_name
        const testData = data.find((item) => item.test_name === 'TC-API-02');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: testData.email,
            password: testData.password
          }
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('access_token');
          expect(response.body.access_token).to.be.a('string').and.not.be.empty;
          expect(response.body).to.have.property('token_type');
        });
      });
    });

  describe('Productos', () => {
    it('TC-API-03 - GET /products responde con estructura válida (id, name, price)', () => {});

    it('TC-API-04 - GET /products/{id} devuelve el detalle del producto', () => {});

    it('TC-API-05 - GET /products/{id} inexistente devuelve 404', () => {});

    it('TC-API-06 - GET /products?search=... filtra resultados correctamente', () => {});

    it('TC-API-07 - GET /products?category_id=... filtra por categoría', () => {});

    it('TC-API-08 - Paginación de productos respeta page y per_page', () => {});
  });

  describe('Autenticación y Usuarios', () => {
    it('TC-API-09 - Login con contraseña incorrecta devuelve 401 y sin token', () => {});

    it('TC-API-10 - Login con email inexistente devuelve 401', () => {});

    it('TC-API-11 - Login con campos vacíos devuelve error de validación', () => {});

    it('TC-API-12 - GET /users/me con token válido devuelve 200', () => {});

    it('TC-API-13 - GET /users/me sin token devuelve 401', () => {});

    it('TC-API-14 - Registro de usuario nuevo (email único) devuelve 201', () => {});

    it('TC-API-15 - Registro con email duplicado devuelve error', () => {});

    it('TC-API-16 - Registro con email inválido/contraseña corta devuelve 422', () => {});
  });

  describe('Catálogos', () => {
    it('TC-API-17 - GET /brands devuelve 200 y lista no vacía', () => {});

    it('TC-API-18 - GET /categories devuelve 200 y lista no vacía', () => {});
  });

  describe('Carrito', () => {
    it('TC-API-19 - Crear carrito sin autenticación devuelve 401', () => {});

    it('TC-API-20 - GET /carts/{id} autenticado devuelve el carrito', () => {});

    it('TC-API-21 - Agregar producto inexistente al carrito devuelve 404/422', () => {});

    it('TC-API-22 - Agregar cantidad 0 al carrito devuelve error de validación', () => {});
  });

  describe('Contacto', () => {
    it('TC-API-23 - POST /messages con datos válidos devuelve confirmación', () => {});

    it('TC-API-24 - POST /messages sin campos obligatorios devuelve 422', () => {});

    it('TC-API-25 - POST /messages con mensaje demasiado largo devuelve 422', () => {});
  });
});
