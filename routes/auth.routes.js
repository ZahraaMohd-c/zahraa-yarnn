const router = require('express').Router();
const { error } = require('console');
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs',{ error: null })
})

router.post('/sign-up', async (req,res) => {
    try{
        const {username, password} = req.body

        if(!username || !password){
            return res.render('auth/sign-up', { error: 'All fields are required'})
        }
        if(password.length< 6){
            return res.render('auth/sign-up',{ error: 'Password must be at least 6 characters long.'})

        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render("auth/sign-up", {
                error: "Username is already taken."

            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = {
            username,
            password: hashedPassword,
        }

        await User.create(newUser)

        res.redirect('/auth/login')

    }
    catch(error){
        console.error('sign-up error:',error)
        res.render('auth/sign-up',{error: "Something went wrong. Please try again "})
    }
})

router.get('/login',  (req,res) => {
    res.render('auth/login.ejs',{error:null})
    
})

router.post('/login', async (req,res) => {
    try{
        const userIndatabase = await User.findOne({username: req.body.username})
        if(!userIndatabase){
            return res.render('auth/login',{ error: 'username not found'})
        }

        const validPassword = bcrypt.compareSync( req.body.password, userIndatabase.password)

        if(!validPassword){
            return res.render('auth/login', {error: 'Incorrect password'})

        }

        req.session.user = {
            username: userIndatabase.username,
            _id: userIndatabase._id
        }
        res.redirect('/')

    }
    catch(error){
        console.error('Error duirng sign-in:',error)
        
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy()
    res.redirect('/auth/login')
})



module.exports = router;