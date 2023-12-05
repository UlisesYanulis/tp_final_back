const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const productRouter = require('./routers/productRouter');
const sessionRouter = require('./routers/sessionRouter');

/* Configuraciones */
dotenv.config();
const mongoose = require('./config/dbConfig');
const app = express();
const PORT = process.env.PORT || 8080;

/* Middlewares */
// Configuración CORS más específica
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con el puerto de tu aplicación frontend
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Servir archivos estáticos desde public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Routers */
app.use('/api/products', productRouter);
app.use('/session', sessionRouter);

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en: http://localhost:${PORT}/`);
});