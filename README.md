------- Proyecto Final Curso Backend Avanzado I: API eCommerce -------

=== Tecnologías utilizadas ===

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Postman (para los tests de la API)
- Handlebars (estructura inicial, implementación detenida)

=== Funcionalidades CRUD ===

Productos:

GET /api/products – Obtener todos los productos
GET /api/products/:pid – Obtener producto por ID
POST /api/products – Crear producto nuevo
PUT /api/products/:pid – Actualizar un producto
DELETE /api/products/:pid – Eliminar producto

Carritos:

POST /api/carts – Crear nuevo carrito
DELETE /api/carts/:cid – Eliminar carrito por ID
GET /api/carts/:cid – Obtener carrito por ID (con los productos populados, si los tiene)
POST /api/carts/:cid/product/:pid – Agregar producto al carrito
PUT /api/carts/:cid/product/:pid/decrement – Restar una unidad del producto en el carrito (repone stock)
DELETE /api/carts/:cid/product/:pid – Eliminar producto entero del carrito (repone stock)
DELETE /api/carts/:cid – Eliminar todos los productos del carrito (repone stock)

=== Testing ===

Postman:

Dentro del repositorio está mi colección de Postman para que puedas importar con las pruebas de los endpoints listas en http://localhost:3000 

=== Notas finales === 

Se borraron archivos y carpetas que quedaron obsoletos luego de la migración a MongoDB Atlas, y se comentaron otros. Estos últimos los mantuve en el proyecto para que quedara un backlog del trabajo realiazdo.