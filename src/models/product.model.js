const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    img: String,
    categoria: {
        type: String,
        index: true
    },
    talle: [String],
    stock: {
        type: Number,
        default: 0,
        min: 0
    }
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
