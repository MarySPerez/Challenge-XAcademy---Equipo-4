describe('Módulo Checkout y Procesamiento de Pagos', () => {

    beforeEach(() => {
      cy.visit('https://with-bugs.practicesoftwaretesting.com/')
    })
  
    it('TC-BUY-001: Flujo de compra hasta selección de método de pago', () => {
        //Agregar producto e ir al carrito
        cy.get('.card').first().click()
        cy.get('[data-test="add-to-cart"]').click()
        cy.get('[data-test="nav-cart"]').click()
        cy.get('[data-test="proceed-1"]').click()
    
        //Login con fixture
        cy.fixture('users').then((datos) => {
          cy.get('[data-test="email"]').type(datos[0].email)
          cy.get('[data-test="password"]').type(datos[0].password)
          cy.get('[data-test="login-submit"]').click()
        })
    
        //Avanzar a dirección, completar el campo State obligatorio y hacer clic en el botón verde
        cy.get('[data-test="proceed-2"]').click()
        cy.wait(2000)
        cy.get('[data-test="state"]').type("Jujuy")
        cy.get('[data-test="proceed-3"]').should('not.be.disabled').click()



        //Verificar que se despliega el selector de pago
        cy.get('[data-test="payment-method"]').should('be.visible')
        // Para elegir Cash on Delivery:
        cy.get('[data-test="payment-method"]').select('Credit Card')
        cy.get('[data-test="account-name"]').type('Ramiro Mamani')
        cy.get('[data-test="account-number"]').type('1234567891234567')
        cy.get('[data-test="finish"]').click()

      })



    it('TC-BUY-006: Validar bloqueo al dejar campos de dirección en blanco en Checkout', () => {
      //Verificar catálogo y seleccionar primer producto
      cy.get('.card').should('have.length.greaterThan', 0)
      cy.get('.card').first().click()
  
      //Agregar al carrito e ir al carrito
      cy.get('[data-test="add-to-cart"]').click()
      cy.get('[data-test="nav-cart"]').click()
  
      //Avanzar al login
      cy.get('[data-test="proceed-1"]').click()
  
      //Iniciar sesión leyendo el primer usuario de users.json
      cy.fixture('users').then((datos) => {
        cy.get('[data-test="email"]').type(datos[0].email)
        cy.get('[data-test="password"]').type(datos[0].password)
        cy.get('[data-test="login-submit"]').click()
      })
  
      //Avanzar a dirección y vaciar campo obligatorio para validar bloqueo
      cy.get('[data-test="proceed-2"]').click()
      cy.get('[data-test="state"]').type('ARG')
      cy.get('[data-test="proceed-3"]').should('be.disabled')
    })

  
  })