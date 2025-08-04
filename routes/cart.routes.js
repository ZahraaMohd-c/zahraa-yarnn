const router = require('express').Router()
const product = require('../models/product')
const {cloudinary, multerSetup } = require("../config/cloudinary")
const upload = multerSetup()

router.post('/add/:productId', async (req, res) => {
    if (!req.session.cart){
        req.session.cart = [];
    } 
    req.session.cart.push({ product: req.params.productId, quantity: req.body.quantity || 1 });
    res.redirect('/products');
})

router.get('/',upload.single("image"), async (req, res) => {
    const cartItems = req.session.cart || [];
    const populatedCartItems = [];
    for (const item of cartItems) {
        const prod = await product.findById(item.product);
        if (prod) {
            populatedCartItems.push({
                productId: item.product,
                productName: prod.productName,
                price: prod.price,
                quantity: item.quantity,
                image: prod.image

            });
        }
    }
    res.render('cart/cart.ejs', { cartItems: populatedCartItems });
})

router.post('/remove/:productId', (req, res) => {
    req.session.cart = (req.session.cart || []).filter(item => item.product !== req.params.productId);
    res.redirect('/cart');
})


router.put('/update/:productId', (req, res) => {
    const newQuantity = Number(req.body.quantity);
    if (!req.session.cart) req.session.cart = [];
    req.session.cart = req.session.cart.map(item => {
        if (item.product === req.params.productId) {
            return { ...item, quantity: newQuantity };
        }
        return item;
    });
    res.redirect('/cart');
});

module.exports = router