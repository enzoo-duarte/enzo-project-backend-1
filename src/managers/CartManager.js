const fs = require('fs').promises;
const path = require('path');
const ProductManager = require('./ProductManager');

class CartManager {
    constructor(filePath = 'carts.json') {
        this.path = path.resolve(__dirname, filePath);
        this.productManager = new ProductManager(
            path.join(__dirname, '../data/products.json') // CORRECCION DE LA RUTA AL JSON
        );
    }

    async _loadCarts() {
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            await fs.writeFile(this.path, '[]');
            return [];
        }
    }

    async _saveCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    }

// MÉTODO PARA CREAR UN NUEVO CARRITO
    async createCart() {
        const carts = await this._loadCarts();
        const newId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);
        await this._saveCarts(carts);
        return newCart;
    }

// MÉTODO PARA OBTENER UN CARRITO POR ID
    async getCartById(cid) {
        const carts = await this._loadCarts();
        const cart = carts.find(c => c.id === cid);
        return cart || null;
    }

// MÉTODO PARA AGREGAR PRODUCTO AL CARRITO
    async addProductToCart(cid, pid) {
        const carts = await this._loadCarts();
        const cartIndex = carts.findIndex(c => c.id === cid);

        if (cartIndex === -1) {
            throw new Error(`No se encontró el carrito con ID ${cid}`);
        }

        const product = await this.productManager.getProductById(pid);
        if (!product) {
            throw new Error(`No existe el producto con ID ${pid}`);
        }

        const cart = carts[cartIndex];
        const existingProduct = cart.products.find(p => p.product === pid);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this._saveCarts(carts);
        return cart;
    }

    // MÉTODO PARA ELIMINAR PRODUCTO DE UN CARRITO
    async removeProductFromCart(cid, pid) {
        const carts = await this._loadCarts();
        const cartIndex = carts.findIndex(c => c.id === cid);

        if (cartIndex === -1) {
            throw new Error(`No se encontró el carrito con ID ${cid}`);
        }

        const cart = carts[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product === pid);

        if (productIndex === -1) {
            throw new Error(`El producto con ID ${pid} no está en el carrito`);
        }

        cart.products.splice(productIndex, 1);
        await this._saveCarts(carts);
        return cart;
    }
}

module.exports = CartManager;
