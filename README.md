# E-commerce API

Este proyecto es una API RESTful para manejar un sistema de e-commerce. La API permite gestionar categorías, productos, usuarios, pedidos y revisiones, y está protegida con autenticación y roles.

---

## **Tabla de Contenidos**

- [Características](#características)
- [Requisitos](#requisitos)
- [Endpoints](#endpoints)
  - [Categorías](#categorías)
  - [Productos](#productos)
  - [Usuarios](#usuarios)
  - [Pedidos](#pedidos)
  - [Revisiones](#revisiones)
- [Middleware](#middleware)
- [Contribución](#contribución)

---

## **Características**

- CRUD para categorías, productos, usuarios, pedidos y revisiones.
- Sistema de autenticación con JWT.
- Roles (administrador y usuario).
- Rutas protegidas con middlewares de autenticación.
- Filtros avanzados para productos (por precio, nombre, categorías, etc.).
- Relación entre categorías, productos y revisiones.

---

## **Requisitos**

- Node.js (v14 o superior).
- npm o yarn.
- Una base de datos (MongoDB, MySQL, etc.) configurada para conectarse con la API.

---

## **Endpoints**

### **Categorías**

- `POST /categories/create`: Crear una nueva categoría.
- `PUT /categories/id/:id`: Actualizar una categoría por ID.
- `DELETE /categories/id/:id`: Eliminar una categoría por ID.
- `GET /categories`: Obtener todas las categorías.
- `GET /categories/id/:id`: Obtener una categoría por ID.
- `GET /categories/name/:name`: Obtener una categoría por nombre.
- `GET /categories/getWithIdAllProducts/id/:id`: Obtener una categoría junto con todos sus productos asociados.

---

### **Productos**

- `POST /products/create`: Crear un nuevo producto (requiere autenticación y rol de administrador).
- `PUT /products/update/id/:id`: Actualizar un producto por ID (requiere autenticación y rol de administrador).
- `DELETE /products/delete/id/:id`: Eliminar un producto por ID (requiere autenticación y rol de administrador).
- `GET /products`: Obtener todos los productos.
- `GET /products/id/:id`: Obtener un producto por ID.
- `GET /products/name/:name`: Obtener productos por nombre.
- `GET /products/priceAbove/:price`: Obtener productos con un precio mayor al especificado.
- `GET /products/priceBelow/:price`: Obtener productos con un precio menor al especificado.
- `GET /products/priceHigherToLower`: Obtener productos ordenados por precio de mayor a menor.
- `GET /products/getWithIdCategories/id/:id`: Obtener un producto con sus categorías asociadas.
- `GET /products/getCategoriesAndReviews`: Obtener productos con sus categorías y reseñas.
- `GET /products/getByIdCategoriesAndReviews/id/:id`: Obtener un producto por ID con sus categorías y reseñas.

---

### **Usuarios**

- `POST /users/create`: Registrar un nuevo usuario.
- `GET /users/getAll`: Obtener todos los usuarios.
- `DELETE /users/id/:id`: Eliminar un usuario por ID (requiere autenticación y rol de administrador).
- `PUT /users/id/:id`: Actualizar un usuario por ID.
- `POST /users/login`: Iniciar sesión.
- `DELETE /users/logout`: Cerrar sesión (requiere autenticación).
- `GET /users/getOrdersProducts`: Obtener todos los pedidos y productos asociados al usuario autenticado.

---

### **Pedidos**

- `POST /orders/create`: Crear un nuevo pedido.
- `GET /orders`: Obtener todos los pedidos.
- `GET /orders/getProducts/id/:id`: Obtener los productos de un pedido por ID.
- `GET /orders/getByUser_idProducts`: Obtener pedidos y productos asociados al usuario autenticado (requiere autenticación).

---

### **Revisiones**

- `GET /reviews`: Obtener todas las reseñas.
- `POST /reviews/create`: Crear una nueva reseña (requiere autenticación).
- `GET /reviews/getWithProduct`: Obtener todas las reseñas con información de los productos.
- `GET /reviews/getWithUser`: Obtener todas las reseñas con información de los usuarios.
- `GET /reviews/getByProduct/id/:id`: Obtener todas las reseñas de un producto por ID.
- `GET /reviews/getByUser/id/:id`: Obtener todas las reseñas de un usuario por ID.

---

## **Middleware**

Este proyecto incluye algunos middlewares personalizados que ayudan en la autenticación y autorización de los usuarios.

- **authentication**: Este middleware asegura que el usuario esté autenticado. Verifica el token JWT en las solicitudes para garantizar que solo los usuarios autenticados puedan acceder a ciertas rutas.
- **isAdmin**: Este middleware verifica si el usuario autenticado tiene permisos de administrador, lo que es requerido para algunas operaciones, como la creación y actualización de productos.

Ambos middlewares se encuentran en el archivo `middleware/authentication.js`.

## **Contribución**

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un **fork** del repositorio.
2. Crea una nueva rama para tu contribución (`git checkout -b mi-nueva-funcionalidad`).
3. Realiza tus cambios y haz **commit** (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu repositorio (`git push origin mi-nueva-funcionalidad`).
5. Abre un **pull request** describiendo los cambios que has realizado.

Asegúrate de seguir las mejores prácticas de codificación y de incluir pruebas para nuevas funcionalidades.
