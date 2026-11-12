describe('Pruebas del Formulario de Contacto - Practice Software Testing', () => {
  beforeEach(() => {
    cy.visit('/#/contact');
  });

    it('TC-CNT-001: Envío exitoso de mensaje de contacto con datos válidos', () => {
        cy.fixture('contact').then((data) => {
        const testData = data.find((item) => item.test_name === 'TC-CNT-001');

        cy.intercept('POST', '**/messages').as('submitMessage');

        cy.get('[data-test="first-name"]').type(testData.first_name);
        cy.get('[data-test="last-name"]').type(testData.last_name);
        cy.get('[data-test="email"]').type(testData.email);
        cy.get('[data-test="subject"]').select(testData.subject);
        cy.get('[data-test="message"]').type(testData.message);

        cy.get('[data-test="contact-submit"]').click();

        cy.wait('@submitMessage');

        cy.get('.alert, [role="alert"]', { timeout: 8000 })
            .should('be.visible')
            .and('contain.text', 'Thanks for your message');
        });
     });   

  it('TC-CNT-002: Validación de formato de correo electrónico inválido', () => {
    cy.fixture('contact').then((data) => {
      const testData = data.find((item) => item.test_name === 'TC-CNT-002');

      cy.get('[data-test="first-name"]').type(testData.first_name);
      cy.get('[data-test="last-name"]').type(testData.last_name);
      cy.get('[data-test="email"]').type(testData.email);
      cy.get('[data-test="subject"]').select(testData.subject);
      cy.get('[data-test="message"]').type(testData.message);
      
      cy.get('[data-test="contact-submit"]').click();

      cy.get('[data-test="email-error"]').should('contain.text', 'e-mail');
    });
  });

  it('TC-CNT-003: Validación de límite mínimo de 50 caracteres en el mensaje', () => {
    cy.fixture('contact').then((data) => {
      const lowData = data.find((item) => item.test_name === 'TC-CNT-003_Boundary_Low');

      cy.get('[data-test="first-name"]').type(lowData.first_name);
      cy.get('[data-test="last-name"]').type(lowData.last_name);
      cy.get('[data-test="email"]').type(lowData.email);
      cy.get('[data-test="subject"]').select(lowData.subject);
      cy.get('[data-test="message"]').type(lowData.message);
      
      cy.get('[data-test="contact-submit"]').click();
      cy.get('[data-test="message-error"]').should('contain.text', 'minimal 50 characters');

      cy.reload();
      const validData = data.find((item) => item.test_name === 'TC-CNT-003_Boundary_Valid');

      cy.get('[data-test="first-name"]').type(validData.first_name);
      cy.get('[data-test="last-name"]').type(validData.last_name);
      cy.get('[data-test="email"]').type(validData.email);
      cy.get('[data-test="subject"]').select(validData.subject);
      cy.get('[data-test="message"]').type(validData.message);
      
      cy.get('[data-test="contact-submit"]').click();
      cy.contains(validData.expected_message).should('be.visible');
    });
  });

  it('TC-CNT-004: Validación de tipo de archivo adjunto no permitido (.exe)', () => {
    cy.fixture('contact').then((data) => {
      const testData = data.find((item) => item.test_name === 'TC-CNT-004');

      cy.get('[data-test="first-name"]').type(testData.first_name);
      cy.get('[data-test="last-name"]').type(testData.last_name);
      cy.get('[data-test="email"]').type(testData.email);
      cy.get('[data-test="subject"]').select(testData.subject);
      cy.get('[data-test="message"]').type(testData.message);

      cy.get('[data-test="attachment"]').selectFile({
        contents: Cypress.Buffer.from('file contents'),
        fileName: testData.attachment,
        mimeType: 'application/x-msdownload',
      });

      cy.get('[data-test="contact-submit"]').click();

      cy.get('body').should('contain', 'File type not allowed');
    });
  });

  it('TC-CNT-005: Verificar navegación y etiqueta correcta hacia el módulo de Contacto', () => {
    cy.visit('/#/');
    
    cy.get('[data-test="nav-contact"]')
      .should('be.visible')
      .and('have.text', 'Contact')
      .click();

    cy.url().should('include', '/#/contact');
  });
});