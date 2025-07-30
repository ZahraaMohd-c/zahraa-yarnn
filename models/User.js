const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: [true, 'Username is required '],
        unique: [true, 'username already taken please pick another username']
    },
    password : {
        type: String,
        required: [true, 'Password is required ']
    },
    phoneNumber:{
        type: Number,
        required: [,'Phone number is required for contact']
    },
    role:{
        type: String ,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User