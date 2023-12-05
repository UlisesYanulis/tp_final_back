const express = require('express');
const multer = require('multer');
const path = require('path');
const { createProduct, getProducts, deleteProduct, getProductById, updateProduct } = require('../dao/controllers/productController');
const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Middleware para servir imágenes estáticas
productRouter.use('/images', express.static(path.join(__dirname, '../public/images')));

productRouter.get('/', async (req, res) => {
    res.json({ ok: true, products: await getProducts() });
});

productRouter.post('/', upload.single('thumbnail'), async (req, res) => {
    try {
        console.log('Received file:', req.file);
        const thumbnailPath = req.file.path;

        // Agrega la siguiente línea para imprimir la ruta de la imagen
        console.log('Thumbnail path:', thumbnailPath);

        const { nombre, precio, stock, descripcion } = req.body;

        // Validación para campos obligatorios
        if (!nombre || !precio || !stock || !descripcion || !thumbnailPath) {
            return res.status(400).json({ ok: false, error: 'Por favor, complete todos los campos obligatorios.' });
        }

        await createProduct({
            nombre,
            precio,
            stock,
            descripcion,
            thumbnail: thumbnailPath,
        });
        res.status(200).json({ ok: true, products: await getProducts() });
    } catch (error) {
        console.error('Error during product creation:', error);
        res.status(500).json({ ok: false, error: 'Internal Server Error' });
    }
});

    productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    let result = await deleteProduct(pid);
    if (result.ok) {
        return res.status(200).json({
        ok: true,
        products: await getProducts(),
        deletedProduct: result.deletedProduct,
        });
    } else {
        return res.status(404).json({ ok: false, error: result.error });
    }
    });

    productRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    let product = await getProductById(pid);
    if (product) {
        res.status(200).json({ ok: true, product });
    } else {
        res.status(404).json({ ok: false, error: 'Product not found' });
    }
    });

    productRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const updatedData = req.body;

    const result = await updateProduct(pid, updatedData);

    if (result.ok) {
        res.status(200).json({
        ok: true,
        content: 'Producto actualizado con éxito',
        updatedProduct: result.updatedProduct,
        });
    } else {
        res.status(404).json({ ok: false, error: result.error });
    }
});

module.exports = productRouter;