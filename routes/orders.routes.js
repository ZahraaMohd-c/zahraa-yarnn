const router = require('express').Router()
const Order = require('../models/Order')
const Product = require('../models/product')
const User = require('../models/User')

router.get('/:productId', async(req,res) => {
    try{
        const foundProduct = await Product.findById(req.params.productId)
        const user = res.locals.user || req.user;
        const userFull = await User.findById(user)
        res.render('orders/new.ejs',{foundProduct, userFull})
    
    }
    catch(error){
        console.log(error)
    }
    
})

router.post('/:productId', async(req, res) => {
   try {
        const user = res.locals.user || req.user;
        const product = await Product.findById(req.params.productId);
        
        const orderData = {
            products: [product._id],
            user: user._id || user,  
            quantity: req.body.quantity,
            orderDate: Date.now()
        };

        const createOrder = await Order.create(orderData);
        res.redirect('/products');
    }
    catch(error){
        console.log(error)
    }
})

router.get('/', async (req,res) => {
    try{
        const allOrders = await Order.find().populate('products')
        res.render('orders/orders-page.ejs',{allOrders})


    }
    catch(error){
        console.log(error)
    }
})

module.exports = router