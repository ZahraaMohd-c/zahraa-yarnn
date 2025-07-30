const router = require('express').Router()
const Product = require('../models/product')
const User = require('../models/User')

router.get('/', async (req,res) => {
    try{
        const allProducts = await Product.find()
        res.render('products/all-products.ejs',{allProducts})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/new',(req,res) =>{
    res.render('products/new.ejs')
})

router.post('/', async (req,res) => {
    try{
        const createdProduct = await Product.create(req.body)
        res.redirect('/allproducts')

    }
    catch(error){
        console.log(error)

    }
})
router.get('/:id', async (req,res) => {
    try{
        const foundProduct = await Product.findById(req.params.id)
        const user = res.locals.user || req.user;
        const userRole = await User.findById(user._id)
        res.render('products/product-details.ejs', { foundProduct, userRole });
        console.log(userRole.role)
    }
    catch(error){
        console.log(error)
    }
})

router.get('/:id/edit', async (req,res) => {
    try{
        const foundProduct = await Product.findById(req.params.id)
        res.render('products/update.ejs',{foundProduct})

    }
    catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req,res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/products')

    }
    catch(error){
        console.log(error)
    }
})

router.delete('/:id', async (req,res) => {
    try{
        const deleteProduct = await Product.findByIdAndUpdate(req.params.id)
        res.redirect('/products')


    }
    catch(error){
        console.log(error)

    }
})



module.exports = router