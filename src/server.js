// SE ANULA POR LA MIGRACION A MongoDB

/* 

const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);

const ProductManager = require('./managers/ProductManager');
const productManager = new ProductManager('./src/data/products.json');

// WEBSOCKET
io.on('connection', async (socket) => {
    console.log('🟢 Nuevo cliente conectado');

    const products = await productManager.getProducts();
    socket.emit('updateProducts', products);

    socket.on('newProduct', async (product) => {
    try {
        if (product.id) {
            product.id = Number(product.id);
        }
        await productManager.addProduct(product);
        const updated = await productManager.getProducts();
        io.emit('updateProducts', updated);
    } catch (err) {
        console.error('Error al agregar producto:', err.message);
    }
});

    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(Number(id));
            const updated = await productManager.getProducts();
            io.emit('updateProducts', updated);
        } catch (err) {
            console.error('Error al eliminar producto:', err.message);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

*/