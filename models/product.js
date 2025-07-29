const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    prductName: {
        type: String,
        required: [true, 'The product name is required']   
    },
    price: {
        type: Number,
        required: [true, 'The price is required ']
    },
    description: String
})