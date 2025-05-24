// SE ANULA PARA PODER HACER PRUEBAS CON POSTMAN, YA QUE TIRA ERROR 

/* 
const express = require('express');
const router = express.Router();
const path = require('path');
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager(path.join(__dirname, '../data/products.json'));

// RUTA PARA LA VISTA home.handlebars
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { title: 'Productos', products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});

// RUTA PARA LA VISTA realTimeProducts.handlebars (WebSocket)
router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
    } catch (error) {
        res.status(500).send('Error al cargar los productos en tiempo real');
    }
});

module.exports = router;
*/