const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

// SE ANULA PARA PODER HACER PRUEBAS CON POSTMAN, YA QUE TIRABA ERROR 
/* const viewsRouter = require('./routes/views.router'); */

const productsRouter = require('./routes/products.router');

const cartsRouter = require('./routes/carts.router');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas

// SE ANULA PARA PODER HACER PRUEBAS CON POSTMAN, YA QUE TIRABA ERROR 
/* app.use('/', viewsRouter); */

app.use('/api/products', productsRouter);

app.use('/api/carts', cartsRouter);

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://Cluster71288:UGp7QVFjZGpw@cluster71288.deco0q2.mongodb.net/Store?retryWrites=true&w=majority')
    .then(() => {
        console.log('🟢 Conectado a MongoDB Atlas');
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('❌ Error al conectar a la base de datos:', error);
    });
