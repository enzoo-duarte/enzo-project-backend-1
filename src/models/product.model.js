const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    img: String,
    categoria: String,
    talle: [String]
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;