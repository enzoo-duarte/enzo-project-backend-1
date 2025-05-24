import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    img: { type: String },
    categoria: { type: String },
    talle: { type: [String] }
});

// Este modelo apunta a la colección 'products' dentro de la base de datos 'Store'
export const ProductModel = mongoose.model('products', productSchema);
