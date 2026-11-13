describe('Pruebas de API - Toolshop', () => {
  describe('Obligatorios (3.7)', () => {
  const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

  it('TC-API-01 y TC-API-02: Lista de productos y login por API en el mismo flujo', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/products`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
      expect(response.body.data.length).to.be.greaterThan(0);
    });
    cy.fixture('api').then((data) => {
      const testData = data.find((item) => item.test_name === 'TC-API-02');

      cy.request({
        method: 'POST',
        url: `${apiUrl}/users/login`,
        body: {
          email: testData.email,
          password: testData.password
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body).to.have.property('access_token');
        expect(loginResponse.body.access_token).to.be.a('string').and.not.be.empty;
        expect(loginResponse.body).to.have.property('token_type');
      });
    });
  });
});
});

