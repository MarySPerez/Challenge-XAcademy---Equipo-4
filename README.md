# 🛠️ Challenge Final - QA Automation con Cypress (Toolshop)

Proyecto de automatización de pruebas End-to-End (E2E) y API desarrollado con Cypress sobre la plataforma **Toolshop** ([https://with-bugs.practicesoftwaretesting.com/](https://with-bugs.practicesoftwaretesting.com/)). Este proyecto incluye la planificación de casos de prueba, ejecución de tests automatizados y reporte estructurado de bugs encontrados.

---

## 👥 Integrantes del Equipo

* **Nombre 1**: mail1@ejemplo.com
* **Nombre 2**: mail2@ejemplo.com
* **Nombre 3**: mail3@ejemplo.com
* **Nombre 4**: mail4@ejemplo.com

---

## 🔗 Entregables y Documentación

* 📊 **Plan de Casos de Prueba (Excel/Google Sheets)**: [Link al Documento de Casos de Prueba](#)
* 🐞 **Tablero de Bugs en Trello**: [Link al Tablero de Trello](#)
* 📖 **Documentación API (Swagger)**: [API Toolshop Documentation](https://api-with-bugs.practicesoftwaretesting.com/api/documentation)

---

## 📁 Estructura del Proyecto

```text
cypress-toolshop-challenge/
├── cypress/
│   ├── e2e/
│   │   ├── 01-compra.cy.js        # Flujo de compra exitosa
│   │   ├── 02-registro.cy.js      # Validaciones del formulario de registro
│   │   ├── 03-contacto.cy.js      # Formulario de contacto
│   │   ├── 04-login.cy.js         # Inicio de sesión con datos incorrectos
│   │   ├── 05-busqueda.cy.js      # Búsqueda de productos
│   │   ├── 06-carrito.cy.js       # Eliminar producto del carrito
│   │   └── 07-api.cy.js           # Pruebas de API (cy.request)
│   ├── fixtures/
│   │   ├── users.json             # Datos de usuarios de prueba
│   │   └── contact.json           # Datos para formulario de contacto
│   └── support/
│       ├── commands.js            # Custom commands reutilizables (login, etc.)
│       └── e2e.js                 # Configuración global de soporte
├── .gitignore                      # Exclusión de node_modules y reportes
├── package.json                    # Dependencias y scripts de ejecución
└── README.md                       # Documentación del proyecto
```

---

## ⚙️ Requisitos Previos e Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

---

## 🚀 Ejecución de Pruebas

### Modo Interactivo (Cypress Test Runner)
```bash
npx cypress open
```

### Modo Headless (Ejecución en consola)
```bash
npx cypress run
```

### Ejecutar una spec específica
```bash
npx cypress run --spec "cypress/e2e/01-compra.cy.js"
```

---

## 🛠️ Buenas Prácticas Aplicadas

* **Custom Commands:** Reutilización de flujos repetitivos como inicio de sesión y gestión de productos en carrito para evitar duplicación de código.
* **Manejo de Fixtures:** Separación estricta de datos de prueba (JSON) de la lógica de automatización.
* **Generación de Datos Dinámicos:** Generación de emails únicos por ejecución (`user${Date.now()}@test.com`) para evitar conflictos de estado en base de datos.
* **Selectores Robustos:** Uso de atributos dedicados de testing (`data-test`) para garantizar estabilidad ante cambios de UI.
* **Tests Independientes:** Cada bloque `it` es autosuficiente y se puede ejecutar de manera aislada.
