function isSignedIn(req,res,next){
    if(req.session.user){
        next()
    }
    else{
        res.redirect("/auth/sign-up")
    }
}

module.exports = isSignedIn