const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    prodect: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
    
})