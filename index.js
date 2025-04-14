const ProductManager = require('./ProductManager');
const manager = new ProductManager();

(async () => {
    const productos = await manager.getProducts();
    console.log('Productos actuales:', productos);
})();
