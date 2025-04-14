const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath = 'products.json') {
    this.path = path.resolve(__dirname, filePath);
    }

    async _loadProducts() {
    try {
      await fs.access(this.path); // Esto valida si existe
        const data = await fs.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
// Si no existe lo crea pero con un array vacío
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

// Esto valida que no exista un producto con el mismo id
    if (products.some(p => p.id === product.id)) {
        throw new Error(`Ya existe un producto con ID ${product.id}`);
    }

// Si no se pasó un id, se genera uno 
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

// Esto sería para evitar que se intente modificar el ID
    if ('id' in updateFields) {
        delete updateFields.id;
    }

// Y esto sería para actualizar solo las propiedades dentro de updateFields
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
