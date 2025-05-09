const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager(path.join(__dirname, '../data/products.json'));

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { title: 'Productos', products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

module.exports = router;