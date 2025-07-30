const router = require('express').Router()

router.get('/', (req,res) => {
    res.render('partials/home-page.ejs')
})
module.exports =router