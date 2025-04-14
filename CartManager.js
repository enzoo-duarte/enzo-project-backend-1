const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor(filePath = 'carts.json') {
    this.path = path.resolve(__dirname, filePath);
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
}

module.exports = CartManager;
