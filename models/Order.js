const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    products: [{
       product:{ type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']},
        quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    },
    notes: String
    
},{timestamps:true})

const Order = mongoose.model('Order', orderSchema)
module.exports= Order