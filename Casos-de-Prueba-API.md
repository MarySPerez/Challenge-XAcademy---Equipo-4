# Casos de Prueba - API Toolshop

- **Aplicación:** Toolshop (Practice Software Testing)
- **API Base URL:** `https://api-with-bugs.practicesoftwaretesting.com`
- **Módulo:** API
- **Documentación Swagger:** https://api-with-bugs.practicesoftwaretesting.com/api/documentation
- **Autenticación:** `Authorization: Bearer <access_token>`

---

## TC-API-01

| Campo | Detalle |
|---|---|
| **ID** | TC-API-01 |
| **Módulo** | API |
| **Descripción del caso** | Obtener la lista de productos y verificar que responde correctamente y no está vacía |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. No se requiere autenticación |
| **Pasos a seguir** | 1. Enviar `GET /products`.<br>2. Validar el código de estado de la respuesta.<br>3. Validar que el cuerpo contiene el array `data` con al menos un elemento |
| **Datos de prueba** | Ninguno |
| **Resultado Esperado** | Status `200`. El array `data` contiene uno o más productos |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-02

| Campo | Detalle |
|---|---|
| **ID** | TC-API-02 |
| **Módulo** | API |
| **Descripción del caso** | Iniciar sesión por API con el usuario de prueba y verificar que devuelve un token de acceso |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. Usuario de prueba existente |
| **Pasos a seguir** | 1. Enviar `POST /users/login` con email y contraseña válidos.<br>2. Validar el código de estado.<br>3. Validar que la respuesta incluye `access_token` no vacío |
| **Datos de prueba** | `email: customer@practicesoftwaretesting.com`, `password: welcome01` |
| **Resultado Esperado** | Status `200`. La respuesta contiene `access_token` (string no vacío) y `token_type` |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-03

| Campo | Detalle |
|---|---|
| **ID** | TC-API-03 |
| **Módulo** | API |
| **Descripción del caso** | Verificar que la lista de productos devuelve la estructura esperada (id, name, price) |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /products`.<br>2. Tomar el primer elemento de `data`.<br>3. Validar la presencia y tipo de los campos `id`, `name` y `price` |
| **Datos de prueba** | Ninguno |
| **Resultado Esperado** | Status `200`. Cada producto posee `id` (number), `name` (string) y `price` (number) |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-04

| Campo | Detalle |
|---|---|
| **ID** | TC-API-04 |
| **Módulo** | API |
| **Descripción del caso** | Obtener el detalle de un producto existente por su ID |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible. Obtener un ID válido desde `GET /products` |
| **Pasos a seguir** | 1. Enviar `GET /products` y tomar el `id` del primer producto.<br>2. Enviar `GET /products/{id}`.<br>3. Validar status y que el `id` devuelto coincide |
| **Datos de prueba** | `product_id`: ID obtenido dinámicamente de `GET /products` |
| **Resultado Esperado** | Status `200`. La respuesta contiene el detalle del producto y su `id` coincide con el solicitado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-05

| Campo | Detalle |
|---|---|
| **ID** | TC-API-05 |
| **Módulo** | API |
| **Descripción del caso** | Solicitar el detalle de un producto inexistente y verificar el error 404 |
| **Tipo** | Negativo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /products/999999`.<br>2. Validar el código de estado |
| **Datos de prueba** | `product_id: 999999` (inexistente) |
| **Resultado Esperado** | Status `404` con mensaje de recurso no encontrado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-06

| Campo | Detalle |
|---|---|
| **ID** | TC-API-06 |
| **Módulo** | API |
| **Descripción del caso** | Buscar productos por nombre y verificar que los resultados coinciden con el término buscado |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. Catálogo con productos cargados |
| **Pasos a seguir** | 1. Enviar `GET /products?search=pliers`.<br>2. Validar status.<br>3. Validar que al menos un resultado contiene el término buscado en `name` |
| **Datos de prueba** | `search: pliers` |
| **Resultado Esperado** | Status `200`. El array `data` no está vacío y los nombres contienen `pliers` |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-07

| Campo | Detalle |
|---|---|
| **ID** | TC-API-07 |
| **Módulo** | API |
| **Descripción del caso** | Filtrar productos por categoría y verificar que todos pertenecen a la categoría solicitada |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible. Obtener un `category_id` válido desde `GET /categories` |
| **Pasos a seguir** | 1. Enviar `GET /categories` y tomar un `id`.<br>2. Enviar `GET /products?category_id={id}`.<br>3. Validar que cada producto devuelto pertenece a esa categoría |
| **Datos de prueba** | `category_id`: ID obtenido dinámicamente de `GET /categories` |
| **Resultado Esperado** | Status `200`. Todos los productos devueltos tienen `category.id` igual al filtro |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-08

| Campo | Detalle |
|---|---|
| **ID** | TC-API-08 |
| **Módulo** | API |
| **Descripción del caso** | Verificar que la paginación de productos respeta los parámetros `page` y `per_page` |
| **Tipo** | De borde |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /products?page=1&per_page=5`.<br>2. Validar status.<br>3. Validar `current_page` y que `data.length` sea menor o igual a 5 |
| **Datos de prueba** | `page: 1`, `per_page: 5` |
| **Resultado Esperado** | Status `200`. `current_page` = 1 y `data.length` <= 5 |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-09

| Campo | Detalle |
|---|---|
| **ID** | TC-API-09 |
| **Módulo** | API |
| **Descripción del caso** | Iniciar sesión con contraseña incorrecta y verificar que no se entrega token |
| **Tipo** | Negativo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. Usuario existente |
| **Pasos a seguir** | 1. Enviar `POST /users/login` con email válido y contraseña incorrecta.<br>2. Validar status.<br>3. Validar que no existe `access_token` |
| **Datos de prueba** | `email: customer@practicesoftwaretesting.com`, `password: pass12345` |
| **Resultado Esperado** | Status `401`. La respuesta no contiene `access_token` |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-10

| Campo | Detalle |
|---|---|
| **ID** | TC-API-10 |
| **Módulo** | API |
| **Descripción del caso** | Iniciar sesión con un email inexistente y verificar el error de credenciales |
| **Tipo** | Negativo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /users/login` con un email no registrado.<br>2. Validar status.<br>3. Validar ausencia de token |
| **Datos de prueba** | `email: correo@correo.com`, `password: welcome01` |
| **Resultado Esperado** | Status `401`. La respuesta no contiene `access_token` |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-11

| Campo | Detalle |
|---|---|
| **ID** | TC-API-11 |
| **Módulo** | API |
| **Descripción del caso** | Intentar iniciar sesión con campos vacíos y verificar la validación |
| **Tipo** | De borde |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /users/login` con `email` y `password` vacíos.<br>2. Validar status.<br>3. Validar mensaje de error de validación |
| **Datos de prueba** | `email: ""`, `password: ""` |
| **Resultado Esperado** | Status `422` (o `400`). La respuesta contiene errores de validación para los campos requeridos |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-12

| Campo | Detalle |
|---|---|
| **ID** | TC-API-12 |
| **Módulo** | API |
| **Descripción del caso** | Consultar los datos del usuario autenticado usando un token válido |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | Haber obtenido un `access_token` mediante `POST /users/login` |
| **Pasos a seguir** | 1. Obtener el token con `POST /users/login`.<br>2. Enviar `GET /users/me` con header `Authorization: Bearer <token>`.<br>3. Validar status y que el email coincide con el usuario autenticado |
| **Datos de prueba** | `email: customer@practicesoftwaretesting.com`, `password: welcome01` |
| **Resultado Esperado** | Status `200`. La respuesta contiene los datos del usuario y el email coincide |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-13

| Campo | Detalle |
|---|---|
| **ID** | TC-API-13 |
| **Módulo** | API |
| **Descripción del caso** | Consultar el perfil del usuario sin token y verificar que se rechaza |
| **Tipo** | Negativo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /users/me` sin header `Authorization`.<br>2. Validar status |
| **Datos de prueba** | Sin token |
| **Resultado Esperado** | Status `401`. La respuesta indica que no está autenticado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-14

| Campo | Detalle |
|---|---|
| **ID** | TC-API-14 |
| **Módulo** | API |
| **Descripción del caso** | Registrar un usuario nuevo con email único y verificar la creación |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. Email no registrado previamente |
| **Pasos a seguir** | 1. Generar un email único con la fecha (`user${Date.now()}@test.com`).<br>2. Enviar `POST /users/register` con todos los campos requeridos.<br>3. Validar status.<br>4. Validar datos del usuario creado |
| **Datos de prueba** | `first_name: Test`, `last_name: QA`, `email: user${Date.now()}@test.com`, `password: SuperPass123!`, `dob: 1990-01-01`, `phone: 1123456789`, `address: Calle Falsa 123`, `city: Buenos Aires`, `state: Buenos Aires`, `country: AR`, `postcode: 1000` |
| **Resultado Esperado** | Status `201`. La respuesta contiene el usuario creado con el email generado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-15

| Campo | Detalle |
|---|---|
| **ID** | TC-API-15 |
| **Módulo** | API |
| **Descripción del caso** | Intentar registrar un usuario con un email ya existente y verificar el error |
| **Tipo** | Negativo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible. Email ya registrado en el sistema |
| **Pasos a seguir** | 1. Enviar `POST /users/register` con un email existente.<br>2. Validar status.<br>3. Validar mensaje de error |
| **Datos de prueba** | `email: customer@practicesoftwaretesting.com`, resto de campos válidos |
| **Resultado Esperado** | Status `422` (o `409`). La respuesta indica que el email ya está registrado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-16

| Campo | Detalle |
|---|---|
| **ID** | TC-API-16 |
| **Módulo** | API |
| **Descripción del caso** | Registrar un usuario con email inválido y contraseña demasiado corta |
| **Tipo** | De borde |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /users/register` con email mal formado y contraseña corta.<br>2. Validar status.<br>3. Validar errores de validación de ambos campos |
| **Datos de prueba** | `email: correo-invalido`, `password: 123`, resto de campos válidos |
| **Resultado Esperado** | Status `422`. La respuesta contiene errores de validación para `email` y `password` |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-17

| Campo | Detalle |
|---|---|
| **ID** | TC-API-17 |
| **Módulo** | API |
| **Descripción del caso** | Obtener la lista de marcas y verificar que responde correctamente y no está vacía |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /brands`.<br>2. Validar status.<br>3. Validar que el array de marcas no está vacío |
| **Datos de prueba** | Ninguno |
| **Resultado Esperado** | Status `200`. El array de marcas contiene uno o más elementos |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-18

| Campo | Detalle |
|---|---|
| **ID** | TC-API-18 |
| **Módulo** | API |
| **Descripción del caso** | Obtener la lista de categorías y verificar que responde correctamente y no está vacía |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `GET /categories`.<br>2. Validar status.<br>3. Validar que el array de categorías no está vacío |
| **Datos de prueba** | Ninguno |
| **Resultado Esperado** | Status `200`. El array de categorías contiene uno o más elementos |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-19

| Campo | Detalle |
|---|---|
| **ID** | TC-API-19 |
| **Módulo** | API |
| **Descripción del caso** | Intentar crear un carrito sin autenticación y verificar que se rechaza |
| **Tipo** | Negativo |
| **Prioridad** | Alta |
| **Precondiciones** | API disponible. No enviar token |
| **Pasos a seguir** | 1. Enviar `POST /carts` sin header `Authorization`.<br>2. Validar status |
| **Datos de prueba** | Sin token |
| **Resultado Esperado** | Status `401`. La respuesta indica que no está autenticado |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-20

| Campo | Detalle |
|---|---|
| **ID** | TC-API-20 |
| **Módulo** | API |
| **Descripción del caso** | Obtener un carrito autenticado por su ID y verificar su contenido |
| **Tipo** | Positivo |
| **Prioridad** | Alta |
| **Precondiciones** | Token válido obtenido con `POST /users/login`. Carrito creado previamente con `POST /carts` |
| **Pasos a seguir** | 1. Iniciar sesión y obtener token.<br>2. Crear carrito con `POST /carts` y guardar su `id`.<br>3. Enviar `GET /carts/{id}` con el token.<br>4. Validar status y que el `id` coincide |
| **Datos de prueba** | `email: customer@practicesoftwaretesting.com`, `password: welcome01` |
| **Resultado Esperado** | Status `200`. La respuesta contiene el carrito solicitado con el `id` correcto |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-21

| Campo | Detalle |
|---|---|
| **ID** | TC-API-21 |
| **Módulo** | API |
| **Descripción del caso** | Agregar al carrito un producto inexistente y verificar el error |
| **Tipo** | Negativo |
| **Prioridad** | Media |
| **Precondiciones** | Token válido y carrito creado |
| **Pasos a seguir** | 1. Iniciar sesión y crear un carrito.<br>2. Enviar `POST /carts/{cartId}/product` con `product_id` inexistente.<br>3. Validar status |
| **Datos de prueba** | `product_id: 999999`, `quantity: 1` |
| **Resultado Esperado** | Status `404` (o `422`). La respuesta indica que el producto no existe |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-22

| Campo | Detalle |
|---|---|
| **ID** | TC-API-22 |
| **Módulo** | API |
| **Descripción del caso** | Agregar al carrito un producto con cantidad 0 y verificar la validación |
| **Tipo** | De borde |
| **Prioridad** | Media |
| **Precondiciones** | Token válido y carrito creado. Producto existente |
| **Pasos a seguir** | 1. Iniciar sesión y crear un carrito.<br>2. Enviar `POST /carts/{cartId}/product` con `quantity: 0`.<br>3. Validar status y mensaje de validación |
| **Datos de prueba** | `product_id`: ID válido, `quantity: 0` |
| **Resultado Esperado** | Status `422`. La respuesta indica que la cantidad debe ser mayor a 0 |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-23

| Campo | Detalle |
|---|---|
| **ID** | TC-API-23 |
| **Módulo** | API |
| **Descripción del caso** | Enviar un mensaje de contacto con datos válidos y verificar la confirmación |
| **Tipo** | Positivo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /messages` con todos los campos requeridos.<br>2. Validar status.<br>3. Validar mensaje de confirmación |
| **Datos de prueba** | `name: Test QA`, `email: user${Date.now()}@test.com`, `subject: Consulta`, `message: Mensaje de prueba automatizado` |
| **Resultado Esperado** | Status `201` (o `200`). La respuesta confirma la recepción del mensaje |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-24

| Campo | Detalle |
|---|---|
| **ID** | TC-API-24 |
| **Módulo** | API |
| **Descripción del caso** | Enviar un mensaje de contacto sin los campos obligatorios y verificar la validación |
| **Tipo** | Negativo |
| **Prioridad** | Media |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /messages` con el cuerpo vacío.<br>2. Validar status.<br>3. Validar errores de campos requeridos |
| **Datos de prueba** | `{}` (cuerpo vacío) |
| **Resultado Esperado** | Status `422`. La respuesta contiene errores de validación para los campos requeridos |
| **Resultado obtenido** | Pendiente de ejecución |

---

## TC-API-25

| Campo | Detalle |
|---|---|
| **ID** | TC-API-25 |
| **Módulo** | API |
| **Descripción del caso** | Enviar un mensaje de contacto con un texto demasiado largo y verificar la validación |
| **Tipo** | De borde |
| **Prioridad** | Baja |
| **Precondiciones** | API disponible |
| **Pasos a seguir** | 1. Enviar `POST /messages` con un `message` de 5000 caracteres.<br>2. Validar status.<br>3. Validar error de longitud |
| **Datos de prueba** | `message`: 5000 caracteres; resto de campos válidos |
| **Resultado Esperado** | Status `422`. La respuesta indica que el mensaje supera la longitud permitida |
| **Resultado obtenido** | Pendiente de ejecución |
