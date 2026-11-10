/// <reference types="cypress" />

describe('registro', () => {
    beforeEach(() => {
        cy.visit('/');
    });


    it('registro exitoso', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'registro exitoso') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.url().should('include', '/auth/login');
                    cy.login(email, data.password);
                    cy.url().should('include', '/account');
                }
            });
        });
    });

    it('campos vacíos', () => {
        cy.get('[data-test="nav-sign-in"]').click();
        cy.get('[data-test="register-link"]').click();
        cy.get('[data-test="register-submit"]').click();
        cy.get('[data-test="first-name-error"]').should('be.visible').and('have.text', ' First name is required. ');
        cy.get('[data-test="last-name-error"]').should('be.visible').and('have.text', ' Last name is required. ');
        cy.get('[data-test="dob-error"]').should('be.visible').and('contain', ' Date of Birth is required. ');
        cy.get('[data-test="address-error"]').should('be.visible').and('have.text', ' Address is required. ');
        cy.get('[data-test="postcode-error"]').should('be.visible').and('have.text', ' Postcode is required. ');
        cy.get('[data-test="city-error"]').should('be.visible').and('have.text', ' City is required. ');
        cy.get('[data-test="state-error"]').should('be.visible').and('have.text', ' State is required. ');
        cy.get('[data-test="country-error"]').should('be.visible').and('have.text', ' Country is required. ');
        cy.get('[data-test="phone-error"]').should('be.visible').and('have.text', ' Phone is required. ');
        cy.get('[data-test="email-error"]').should('be.visible').and('have.text', ' E-mail is required. ');
        cy.get('[data-test="password-error"]').should('be.visible').and('have.text', ' Password is required. ');
    });

    it('registro con correo ya registrado', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'correo registrado') {
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, data.email, data.password);
                    cy.get('[data-test="register-error"]').should('be.visible').and('contain', 'User already registered');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });

    it('contraseña no cumple con longitud mínima de caracteres', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'longitud minima pass') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.get('[data-test="password-error"]').should('be.visible').and('have.text', ' Password must be minimal 10 characters long. ');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });

    it('contraseña no cumple con longitud máxima de caracteres', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'longitud maxima pass') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.get('[data-test="password-error"]').should('be.visible').and('have.text', ' Password can not be more than 40 characters long. ');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });

    it('formato de fecha incorrecto', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'formato fecha incorrecto') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.get('[data-test="dob-error"]').should('be.visible').and('have.text', ' Please enter a valid date in YYYY-MM-DD format. ');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });

    it('fecha de nacimiento futura', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'fecha nacimiento futura') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.get('[data-test="register-error"]').should('be.visible').and('have.text', 'Customer must be 18 years old. ');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });

    it('caracteres alfabéticos en número de teléfono', () => {
        cy.fixture('registro').then(registro => {
            registro.forEach(data => {
                if (data.test_name == 'caracteres alfabeticos telefono') {
                    let email = `${Date.now()}_${data.email}`;
                    cy.registrar(data.nombre, data.apellido, data.fecha_nacimiento, data.direccion, data.postcode, data.city, data.state, data.country, data.phone, email, data.password);
                    cy.get('[data-test="phone-error"]').should('be.visible').and('have.text', ' Only numbers are allowed. ');
                    cy.url().should('not.include', '/auth/login');
                }
            });
        });
    });
});