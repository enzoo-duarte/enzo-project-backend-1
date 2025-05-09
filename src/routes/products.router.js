const express = require('express');
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const productManager = new ProductManager(path.join(__dirname, '../data/products.json'));

// GET para todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// GET para cada producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// POST para agregar un producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        await productManager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto agregado exitosamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT para actualizar un producto
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updates = req.body;
        await productManager.updateProduct(id, updates);
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE para eliminar un producto
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await productManager.deleteProduct(id);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
