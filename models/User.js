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
    attribute:{
        type: String ,
        enum: ['customer', 'admin']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User