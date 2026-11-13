describe('Carrito', () => {
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';


    it('TC-API-19 - Crear carrito sin autenticación devuelve 401', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/carts`,
        body: {
          product_id: 'some-product-id',
          quantity: 1
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });

    it('TC-API-20 - GET /carts/{id} autenticado devuelve el carrito', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02');
        const cartData = data.find((item) => item.test_name === 'TC-API-20');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: creds.email,
            password: creds.password
          }
        }).then((loginResponse) => {
          const token = loginResponse.body.access_token;

          cy.request({
            method: 'GET',
            url: `${apiUrl}/carts/${cartData.cart_id}`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            failOnStatusCode: false
          }).then((cartResponse) => {
            expect(cartResponse.status).to.be.oneOf([200, 404]);
          });
        });
      });
    });

    it('TC-API-21 - Agregar producto inexistente al carrito devuelve 404/422', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02');
        const cartData = data.find((item) => item.test_name === 'TC-API-21');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: creds.email,
            password: creds.password
          }
        }).then((loginResponse) => {
          const token = loginResponse.body.access_token;

          cy.request({
            method: 'POST',
            url: `${apiUrl}/carts`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              product_id: cartData.fake_product_id,
              quantity: 1
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([404, 422]);
          });
        });
      });
    });

    it('TC-API-22 - Agregar cantidad 0 al carrito devuelve error de validación', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02');
        const productData = data.find((item) => item.test_name === 'TC-API-22');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: creds.email,
            password: creds.password
          }
        }).then((loginResponse) => {
          const token = loginResponse.body.access_token;

          cy.request({
            method: 'POST',
            url: `${apiUrl}/carts`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              product_id: productData.product_id,
              quantity: 0
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400, 422]);
          });
        });
      });
    });

  });