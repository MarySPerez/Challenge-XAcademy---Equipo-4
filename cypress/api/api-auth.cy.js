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