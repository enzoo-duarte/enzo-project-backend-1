const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const viewsRouter = require('./routes/views.router');
const productsRouter = require('./routes/products.router'); // lo vas a crear ahora

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// HANDLEBARS
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ROUTES
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

module.exports = app;
