const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

mongoose.connect('mongodb+srv://mrsrisalafountain:D3INAzzICrV0AMgF@cluster0.dhmkqhk .mongodb.net/',
(err) => console.log('connected to the database', err)
)

//middleware
app.use(express.json())
app.use(morgan('dev'))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMssg: err.message})
})

mongoose.set('strictQuery', true)

app.listen(8000, () => {
    console.log('server is running on port 8000')
})