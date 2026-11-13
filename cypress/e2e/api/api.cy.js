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
      cy.fixture('api').then((data) => {
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

});
