describe('Catálogos', () => {
    const apiUrl = 'https://api-with-bugs.practicesoftwaretesting.com';

    it('TC-API-17 - GET /brands devuelve 200 y lista no vacía', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/brands`
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.be.an('array');
        expect(response.body).to.not.be.empty;
      });
    });

    it('TC-API-18 - GET /categories devuelve 200 y lista no vacía', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/categories`
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.be.an('array');
        expect(response.body).to.not.be.empty;
      });
    });
  });