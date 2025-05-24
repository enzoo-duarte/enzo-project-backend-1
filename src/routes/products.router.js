const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product.model');

// GET - Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// GET - Obtener producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: 'ID inválido o error al buscar producto' });
    }
});

// POST - Crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json({ message: 'Producto creado correctamente', product: newProduct });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear producto' });
    }
});

// PUT - Actualizar producto existente
router.put('/:pid', async (req, res) => {
    try {
        const updated = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado', product: updated });
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar producto' });
    }
});

// DELETE - Eliminar producto por ID
router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await ProductModel.findByIdAndDelete(req.params.pid);
        if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar producto' });
    }
});

module.exports = router;
