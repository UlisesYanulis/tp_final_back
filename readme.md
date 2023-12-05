E-Commerce Recreation Project
Este proyecto es una recreación de un e-commerce, implementando funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) con persistencia de datos en MongoDB. La aplicación consta de un front-end desarrollado con React y un back-end construido en Node.js con Express. Además, se han utilizado diversas tecnologías y herramientas para garantizar un desarrollo ordenado y eficiente.

Tecnologías Utilizadas
Front-end
React: La interfaz de usuario se ha construido utilizando la biblioteca React para crear componentes reutilizables y gestionar eficientemente el estado de la aplicación.

React Router Dom: Se ha implementado enrutamiento para garantizar una navegación fluida entre las distintas secciones de la aplicación.

Vite: El entorno de desarrollo se ha configurado con Vite para una construcción rápida y eficiente de la aplicación.

ESLint: Se ha integrado ESLint para el linting del código, asegurando un código limpio y consistente.

Back-end
Node.js y Express: El servidor se ha construido utilizando Node.js y Express para gestionar las solicitudes HTTP y proporcionar servicios de backend.

MongoDB: Se ha implementado persistencia de datos utilizando MongoDB, un sistema de base de datos NoSQL, para almacenar y recuperar información relacionada con los productos y usuarios.

bcrypt: La biblioteca bcrypt se ha utilizado para el cifrado seguro de contraseñas.

Cors: Se ha implementado la gestión de CORS para permitir peticiones desde el front-end, que podría estar alojado en un dominio diferente.

Multer: Multer se ha utilizado para el manejo de archivos, permitiendo la carga de imágenes de productos.

Estructura del Proyecto
front/: Contiene el código fuente del front-end.

server/: Contiene el código fuente del back-end.

Configuración del Proyecto
Front-end
Instalar las dependencias utilizando npm install.
Ejecutar la aplicación en modo desarrollo con npm run dev.
Construir la aplicación para producción con npm run build.
Back-end
Instalar las dependencias utilizando npm install.
Configurar las variables de entorno en un archivo .env según las indicaciones en .env.example.
Iniciar el servidor en modo desarrollo con npm run dev.