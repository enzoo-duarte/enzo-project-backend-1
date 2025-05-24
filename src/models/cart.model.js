const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

const CartModel = mongoose.model('carts', cartSchema);

module.exports = CartModel;