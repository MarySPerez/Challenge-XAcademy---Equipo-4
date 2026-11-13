describe('Módulo de Facturas / Órdenes (Flujo de Compras)', () => {
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

    it('TC-API-19 - Crear factura/orden sin autenticación devuelve 401', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-19');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/invoices`,
          body: {
            user_id: 0,
            billing_address: testData.billing_address,
            billing_city: testData.billing_city,
            billing_country: testData.billing_country,
            billing_state: testData.billing_state,
            billing_postcode: testData.billing_postcode,
            total: testData.total,
            payment_method: testData.payment_method,
            payment_account_name: testData.payment_account_name,
            payment_account_number: testData.payment_account_number,
            invoice_items: testData.invoice_items
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });

    it('TC-API-20 - GET /invoices/{id} autenticado consulta la factura creada dinámicamente', () => {
          cy.fixture('api').then((data) => {
            const creds = data.find((item) => item.test_name === 'TC-API-02');
            const invoiceData = data.find((item) => item.test_name === 'TC-API-19');

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
                url: `${apiUrl}/invoices`,
                headers: {
                  Authorization: `Bearer ${token}`
                },
                body: {
                  user_id: 2,
                  billing_address: invoiceData.billing_address,
                  billing_city: invoiceData.billing_city,
                  billing_country: invoiceData.billing_country,
                  billing_state: invoiceData.billing_state,
                  billing_postcode: invoiceData.billing_postcode,
                  total: invoiceData.total,
                  payment_method: invoiceData.payment_method,
                  payment_account_name: invoiceData.payment_account_name,
                  payment_account_number: invoiceData.payment_account_number,
                  invoice_items: invoiceData.invoice_items
                }
              }).then((createResponse) => {
                expect(createResponse.status).to.be.oneOf([201]);
                const invoiceId = createResponse.body.id;

                cy.request({
                  method: 'GET',
                  url: `${apiUrl}/invoices/${invoiceId}`,
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then((getResponse) => {
                  expect(getResponse.status).to.eq(200);
                  expect(getResponse.body).to.have.property('id', invoiceId);
                });
              });
            });
          });
        });

    it('TC-API-21 - Crear factura con datos de producto/ítem inexistente devuelve error', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02');
        const invoiceData = data.find((item) => item.test_name === 'TC-API-19');
        const fakeData = data.find((item) => item.test_name === 'TC-API-21');

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
            url: `${apiUrl}/invoices`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              user_id: 0,
              billing_address: invoiceData.billing_address,
              billing_city: invoiceData.billing_city,
              billing_country: invoiceData.billing_country,
              billing_state: invoiceData.billing_state,
              billing_postcode: invoiceData.billing_postcode,
              total: invoiceData.total,
              payment_method: invoiceData.payment_method,
              payment_account_name: invoiceData.payment_account_name,
              payment_account_number: invoiceData.payment_account_number,
              invoice_items: [
                {
                  product_id: fakeData.fake_product_id,
                  quantity: 1,
                  unit_price: 12.01
                }
              ]
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400, 404, 422]);
          });
        });
      });
    });

    it('TC-API-22 - Crear factura con cantidad 0 o inválida devuelve error de validación', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02');
        const invoiceData = data.find((item) => item.test_name === 'TC-API-19');
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
            url: `${apiUrl}/invoices`,
            headers: {
              Authorization: `Bearer ${token}`
            },
            body: {
              user_id: 0,
              billing_address: invoiceData.billing_address,
              billing_city: invoiceData.billing_city,
              billing_country: invoiceData.billing_country,
              billing_state: invoiceData.billing_state,
              billing_postcode: invoiceData.billing_postcode,
              total: invoiceData.total,
              payment_method: invoiceData.payment_method,
              payment_account_name: invoiceData.payment_account_name,
              payment_account_number: invoiceData.payment_account_number,
              invoice_items: [
                {
                  product_id: productData.product_id,
                  quantity: 0, // Cantidad inválida a propósito
                  unit_price: 12.01
                }
              ]
            },
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([400, 422]);
          });
        });
      });
    });

  });