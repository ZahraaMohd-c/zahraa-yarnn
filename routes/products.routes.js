const e = require('express')
const Product = require('../models/product')
const router = require('express').Router()

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




module.exports = router