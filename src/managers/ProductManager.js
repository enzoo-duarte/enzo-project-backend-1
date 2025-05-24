/* const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath = 'products.json') {
    this.path = path.resolve(__dirname, filePath);
    }

    async _loadProducts() {
    try {
        await fs.access(this.path); 
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        await fs.writeFile(this.path, '[]');
        return [];
    }
    }

    async _saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    }

// MÉTODO PARA OBTENER TODOS LOS PRODUCTOS
    async getProducts() {
        const products = await this._loadProducts();
        return products;
    }

// MÉTODO PARA OBTENER UN PRODUCTO POR SU ID
    async getProductById(pid) {
        const products = await this._loadProducts();
        const product = products.find(p => p.id === pid);
        return product || null;
    }

// MÉTODO PARA AGREGAR UN NUEVO PRODUCTO
    async addProduct(product) {
        const products = await this._loadProducts();

    if (products.some(p => p.id === product.id)) {
        throw new Error(`Ya existe un producto con ID ${product.id}`);
    }

    if (!product.id) {
        const ids = products.map(p => p.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        product.id = maxId + 1;
    }

    products.push(product);
        await this._saveProducts(products);
    }

// MÉTODO PARA ACTUALIZAR UN PRODUCTO EXISTENTE
    async updateProduct(pid, updateFields) {
        const products = await this._loadProducts();
        const index = products.findIndex(p => p.id === pid);

    if (index === -1) {
        throw new Error(`No se encontraron productos con este ID ${pid}`);
    }

    if ('id' in updateFields) {
        delete updateFields.id;
    }

    products[index] = {
        ...products[index],
        ...updateFields
    };

    await this._saveProducts(products);
    }

// MÉTODO PARA ELIMINAR UN PRODUCTO POR SU ID
    async deleteProduct(pid) {
        const products = await this._loadProducts();
        const index = products.findIndex(p => p.id === pid);

    if (index === -1) {
        throw new Error(`No se encontraron productos con este ID ${pid}`);
    }

    products.splice(index, 1);
        await this._saveProducts(products);
    }
}

module.exports = ProductManager;

*/
