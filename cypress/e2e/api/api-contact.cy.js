describe('Contacto', () => {
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

    it('TC-API-23 - POST /messages con datos válidos devuelve confirmación', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-23');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/messages`,
          body: {
            name: testData.name,
            email: testData.email,
            subject: testData.subject,
            message: testData.message
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 201]);
        });
      });
    });

    it('TC-API-24 - POST /messages sin campos obligatorios devuelve 422', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-24');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/messages`,
          body: {
            name: testData.name,
            email: testData.email,
            subject: testData.subject,
            message: testData.message
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(422);
        });
      });
    });

    it('TC-API-25 - POST /messages con mensaje demasiado largo devuelve 422', () => {
      cy.fixture('api').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-API-25');

        cy.request({
          method: 'POST',
          url: `${apiUrl}/messages`,
          body: {
            name: testData.name,
            email: testData.email,
            subject: testData.subject,
            message: testData.message
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(422);
        });
      });
    });

  });