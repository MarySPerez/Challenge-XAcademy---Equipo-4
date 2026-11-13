describe('Autenticación y Usuarios', () => {
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

    
    it('TC-API-09 - Login con contraseña incorrecta devuelve 401 y sin token', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-09');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: testData.email,
            password: testData.password 
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body).to.not.have.property('access_token');
        });
      });
    });

    it('TC-API-10 - Login con email inexistente devuelve 401', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-10');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/login`,
          body: {
            email: testData.email, 
            password: testData.password
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });

    it('TC-API-11 - Login con campos vacíos devuelve error de validación', () => {
      cy.request({
        method: 'POST',
        url: `${apiUrl}/users/login`,
        body: {
          email: '',
          password: ''
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('TC-API-12 - GET /users/me con token válido devuelve 200', () => {
      cy.fixture('api').then((data) => {
        const creds = data.find((item) => item.test_name === 'TC-API-02'); 

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
            url: `${apiUrl}/users/me`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((meResponse) => {
            expect(meResponse.status).to.eq(200);
            expect(meResponse.body).to.have.property('email', creds.email);
          });
        });
      });
    });

    it('TC-API-13 - GET /users/me sin token devuelve 401', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/users/me`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });

it('TC-API-14 - Registro de usuario nuevo (email único) devuelve 201', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-14');
        const emailUnico = `john_${Date.now()}@doe.example`;

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/register`,
          body: {
            first_name: testData.first_name,
            last_name: testData.last_name,
            address: testData.address,
            city: testData.city,
            state: testData.state,
            country: testData.country,
            postcode: testData.postcode,
            phone: testData.phone,
            dob: testData.dob,
            email: emailUnico,
            password: testData.password
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201]);
        });
      });
    });

it('TC-API-15 - Registro con email duplicado devuelve error', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-15');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/register`,
          body: {
            first_name: testData.first_name,
            last_name: testData.last_name,
            email: testData.email,
            password: testData.password,
            phone: testData.phone,
            postcode: testData.postcode,
            state: testData.state,
            country: testData.country,
            address: testData.address,
            city: testData.city,
            dob: testData.dob
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(409);
          expect(response.body.email[0]).to.contain('already registered');
        });
      });
    });

    it('TC-API-16 - Registro con email inválido/contraseña corta devuelve 422', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-16');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/users/register`,
          body: {
            first_name: testData.first_name,
            last_name: testData.last_name,
            email: testData.email,
            password: testData.password, 
            phone: testData.phone,
            postcode: testData.postcode,
            state: testData.state,
            country: testData.country,
            address: testData.address, 
            city: testData.city,
            dob: testData.dob
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(422);
        });
      });
    });
  });