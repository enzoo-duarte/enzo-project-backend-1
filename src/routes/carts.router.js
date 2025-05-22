const express = require('express');
const path = require('path');
const CartManager = require('../managers/CartManager');

const router = express.Router();
const cartManager = new CartManager(path.join(__dirname, '../data/carts.json'));

// PARA CREAR NUEVO CARRITO
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ message: 'Carrito creado', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});

// PARA OBTENER CARRITO POR SU ID
router.get('/:cid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cid);

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

// PARA AGREGAR PRODUCTO A UN CARRITO
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const updatedCart = await cartManager.addProductToCart(cid, pid);
        res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PARA ELIMINAR UN PRODUCTO DE UN CARRITO
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);

        const updatedCart = await cartManager.removeProductFromCart(cid, pid);
        res.json({ message: 'Producto eliminado del carrito', cart: updatedCart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;