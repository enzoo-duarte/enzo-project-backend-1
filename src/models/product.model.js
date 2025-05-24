const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    img: String,
    categoria: {
        type: String,
        index: true
    },
    talle: [String]
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
