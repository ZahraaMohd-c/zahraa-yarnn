const router = require('express').Router()
const Order = require('../models/Order')
const Product = require('../models/product')
const User = require('../models/User')

router.get('/', async (req,res) => {
    try{
        const allOrders = await Order.find().populate('products.product').populate('user')
        const user = res.locals.user || req.user;
        const userFull = await User.findById(user)
        res.render('orders/orders-page.ejs',{allOrders,userFull})


    }
    catch(error){
        console.log(error)
    }
})
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

// Checkout route: create order from cart
router.post('/checkout', async (req, res) => {
    try {
        const user = res.locals.user || req.user;
        const notes =req.body.notes || ''
        const cartItems = req.session.cart || [];
        if (cartItems.length === 0) {
            return res.send('Cart is empty');
        }

        const products = cartItems.map(item => ({
            product: item.product,
            quantity: item.quantity
        }))

        const orderData = {
            products,
            user: user._id || user,
            notes
        }

        await Order.create(orderData);
        req.session.cart = [];
        res.redirect('/orders');
    } catch (error) {
        console.log(error);
        res.send('Order creation failed');
    }
})

router.delete('/:orderId', async (req,res)=> {
    try{
        const deletedOrder = await Order.findByIdAndDelete(req.params.orderId)
        res.redirect('/orders')

    }
    catch(error){
        console.log(error)
    }
})


module.exports = router