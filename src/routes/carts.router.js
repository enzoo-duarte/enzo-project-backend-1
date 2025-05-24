const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart.model');
const ProductModel = require('../models/product.model');
const mongoose = require('mongoose');

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await CartModel.create({ products: [] });
        res.status(201).json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// Eliminar un carrito por su ID
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await CartModel.findByIdAndDelete(cid);

        if (!result) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json({ message: 'Carrito eliminado correctamente', cart: result });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
});

// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid).populate('products.product');
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// Agregar producto a un carrito por ID
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const product = await ProductModel.findById(req.params.pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

        const existing = cart.products.find(p => p.product.equals(req.params.pid));
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.products.push({ product: req.params.pid, quantity: 1 });
        }

        await cart.save();
        res.json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar la cantidad de un producto en el carrito por ID
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: 'Cantidad inválida. Debe ser un número mayor o igual a 1.' });
        }

        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const productInCart = cart.products.find(p => p.product.equals(pid));
        if (!productInCart) {
            return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
        }

        productInCart.quantity = quantity;
        await cart.save();

        res.json({ message: 'Cantidad actualizada correctamente', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar un producto del carrito por ID
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: 'ID inválido' });
        }

        const cart = await CartModel.findById(cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        const pidObjectId = new mongoose.Types.ObjectId(pid);
        cart.products = cart.products.filter(p => !p.product.equals(pidObjectId));

        await cart.save();
        res.json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar todos los productos del carrito
router.delete('/:cid/products', async (req, res) => {
    try {
        const cart = await CartModel.findById(req.params.cid);
        if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

        cart.products = []; // vacía el array de productos
        await cart.save();

        res.json({ message: 'Todos los productos fueron eliminados del carrito', cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;