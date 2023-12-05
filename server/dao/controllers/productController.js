// productController.js
const Product = require("../models/productModel");

const updateProduct = async (productId, updatedData) => {
    try {
        // Encuentra el producto por su ID y actualízalo con los nuevos datos
        const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true } // Devuelve el producto actualizado
        );

        if (!updatedProduct) {
        return { ok: false, error: 'Product not found' };
        }

        return { ok: true, updatedProduct };
    } catch (error) {
        console.error('Error updating product:', error);
        return { ok: false, error: 'Internal Server Error' };
    }
    };

    /* Funcion para controlar la creacion de un producto */
    const createProduct = async (product) => {
    const newProduct = new Product(product);
    try {
        return await newProduct.save();
    } catch (err) {
        console.error(err);
    }
    };

    const getProductById = async (pid) => {
    return await Product.findById(pid);
    };

    const getProducts = async () => {
    return await Product.find({});
    };

    const deleteProduct = async (pid) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(pid);
        if (deleteProduct) {
        return { ok: true, deleteProduct };
        } else {
        return { error: 'Product not found' };
        }
    } catch (err) {
        return { error: 'Invalid ID' };
    }
};

module.exports = { createProduct, getProducts, deleteProduct, getProductById, updateProduct };