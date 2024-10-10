const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
    username: {
        type: String, 
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("entry", entrySchema)