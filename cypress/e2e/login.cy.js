/// <reference types="cypress" />

describe('login', () => {
    beforeEach(() => {
        cy.visit('/');
    });


    it('login exitoso', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name == 'login exitoso') {
                    cy.login(data.email, data.password);
                    cy.url().should('include', '/account');
                }
            });
        });
    });

    it('login sin datos', () => {
        cy.get('[data-test="nav-sign-in"]').click();
        cy.get('[data-test="login-submit"]').click();
        cy.get('[data-test="login-error"]').should('have.text', 'Invalid email or password');
        cy.url().should('not.include', '/account');
    });

    it('correo incorrecto', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name === 'correo incorrecto') {
                    cy.login(data.email, data.password);
                    cy.get('[data-test="login-error"]').should('have.text', 'Invalid email or password');
                    cy.url().should('not.include', '/account');
                }
            });
        });
    });

    it('password incorrecto', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name === 'password incorrecto') {
                    cy.login(data.email, data.password);
                    cy.get('[data-test="login-error"]').should('have.text', 'Invalid email or password');
                    cy.url().should('not.include', '/account');
                }
            });
        });
    });

    it('despliegue de nombre de usuario', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name == 'login exitoso') {
                    cy.login(data.email, data.password);
                    cy.get('[data-test="nav-user-menu"]').should('have.text', 'Jane Doe');
                }
            });
        });
    });

    it('cierre de sesión', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name == 'login exitoso') {
                    cy.login(data.email, data.password);
                    cy.get('[data-test="nav-user-menu"]').click();
                    cy.get('[data-test="nav-sign-out"]').click();
                    cy.url().should('include', '/auth/login');
                }
            });
        });
    });

    it('reestablecer contraseña con correo incorrecto', () => {
        cy.fixture('users').then(login => {
            login.forEach(data => {
                if (data.test_name == 'restablecer pass') {
                    cy.get('[data-test="nav-sign-in"]').click();
                    cy.get('[data-test="forgot-password-link"]').click();
                    cy.get('[data-test="email"]').type(data.email);
                    cy.get('[data-test="forgot-password-submit"]').click();
                    cy.get('[data-test="email-error"]').should('exist');
                }
            });
        });
    });
});