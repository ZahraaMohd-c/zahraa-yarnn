function isAdmin(req,res,next){
    
    if( req.user.role === 'admin'){
        next()
    }
    else{
        res.redirect('/auth/sign-up')
    }
}

module.exports =isAdmin