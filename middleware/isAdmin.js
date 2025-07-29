function isAdmin(req,res,next){
    if(req.user && req.user.role === 'admin'){
        next()
    }
    else{
        // res.redirect('/products')
    }
}

module.exports =isAdmin