const router = require('express').Router()
const Product = require('../models/product')
const User = require('../models/User')
const {cloudinary, multerSetup } = require("../config/cloudinary")
const upload = multerSetup()

router.get('/', async (req,res) => {
    try{
        const allProducts = await Product.find()
        const user = res.locals.user || req.user;
        const userRole = await User.findById(user._id)
        res.render('products/all-products.ejs',{allProducts,userRole})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/new',(req,res) =>{
    res.render('products/new.ejs')
})


router.post('/', upload.single("image") ,async (req,res) => {
    try{
        const {productName, price, description} = req.body

        const newProduct = new Product({
            productName,
            price,
            description,
            image : req.file?.path || null
        })

        await newProduct.save()
        res.redirect('/products')

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

router.put('/:id',upload.single("image"), async (req,res) => {
    try{
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/products')

    }
    catch(error){
        console.log(error)
    }
})

router.delete('/:id',upload.single("image"), async (req,res) => {
    try{
        const deleteProduct = await Product.findByIdAndUpdate(req.params.id)
        res.redirect('/products')


    }
    catch(error){
        console.log(error)

    }
})



module.exports = router