const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'The product name is required']   
    },
    price: {
        type: Number,
        required: [true, 'The price is required ']
    },
    description: String,
    imageUrl: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product