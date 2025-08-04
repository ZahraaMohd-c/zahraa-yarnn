const router = require('express').Router()
const Product = require('../models/product')
const User = require('../models/User')
const {cloudinary, multerSetup } = require("../config/cloudinary")
const upload = multerSetup()
const isAdmin =require('../middleware/isAdmin')

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

router.get('/new',isAdmin,(req,res) =>{
    res.render('products/new.ejs')
})


router.post('/',isAdmin, upload.single("image") ,async (req,res) => {
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

router.get('/:id/edit',isAdmin, async (req,res) => {
    try{
        const foundProduct = await Product.findById(req.params.id)
        res.render('products/update.ejs',{foundProduct})
        
    }
    catch(error){
        console.log(error)
    }
})

router.put('/:id',isAdmin,upload.single("image"), async (req,res) => {
    try{
        const {productName, price, description} = req.body
        const foundProduct = await Product.findById(req.params.id)

         if (req.file) {
            if (foundProduct.imagePublicId) {
                await cloudinary.uploader.destroy(foundProduct.imagePublicId);
            }

            foundProduct.image = req.file.path;
            foundProduct.imagePublicId = req.file.filename;
        }
        
        foundProduct.productName = productName
        foundProduct.price = price
        foundProduct.description = description

        await foundProduct.save()
        res.redirect('/products')

    }
    catch(error){
        console.log(error)
    }
})

router.delete('/:id',isAdmin,upload.single("image"), async (req,res) => {
    try{
        if (req.file) {
            if (foundProduct.imagePublicId) {
                await cloudinary.uploader.destroy(foundProduct.imagePublicId);
            }
            
        }
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        res.redirect('/products')


    }
    catch(error){
        console.log(error)

    }
})



module.exports = router