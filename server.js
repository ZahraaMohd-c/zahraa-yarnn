const express = require("express") 
const app = express() 
const dotenv = require("dotenv").config() 
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require('./config/db')
const session = require('express-session')
const passUserToView =require('./middleware/passUserToView')
const isSignedIn = require('./middleware/isSignedIn')
const isAdmin = require('./middleware/isAdmin')


const ordersRoutes = require('./routes/orders.routes')
const productsRoutes = require('./routes/products.routes')
const authRoutes = require('./routes/auth.routes')
const cartRouter = require('./routes/cart.routes')
const homeRouter = require('./routes/home.routes')

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev")) 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)
app.set('view engine','ejs')


// connect to database
conntectToDB()


app.use('/auth', authRoutes)
app.use(isSignedIn)
app.use('/orders',ordersRoutes)
app.use('/products',productsRoutes)
app.use('/cart',cartRouter)
app.use('/',homeRouter)
// app.use(isAdmin)






const port = process.env.PORT || 3000


const server =app.listen(port,()=>{
    console.log("Listening on port " + port)
}) 

server.on("error", (err) => { 
  if (err.code === "EADDRINUSE") {
    console.error(` Port ${port} is already in use.`);
  } else {
    console.error(" Server error:", err.message);
  }
})




