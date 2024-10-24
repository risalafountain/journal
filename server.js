const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const {expressjwt} = require ('express-jwt')
require('dotenv').config()
const path = require('path')

app.use(express.json())
app.use(morgan('dev'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URI,
(err) => console.log('connected to the database', err))

//ROUTE HANDLERS
//authentication 
app.use('/api/auth', require('./routes/authRouter'))

//auth middleware
app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))

app.use('/api/main/entry/', require('./routes/entryRouter'))



app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMssg: err.message})
})
//test push

//ERR HANDLER
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMssg: err.message})
})

app.use(express.static(path.join(__dirname, "client", "dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); });

app.listen(process.env.PORT, ()=> {
    console.log('server is running on port' + process.env.PORT)
})