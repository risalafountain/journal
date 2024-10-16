const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrySchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    content: {
        type: String,
        required: true
    },
    //create relationship one to many 
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    username: {
        type: String
    }
})

module.exports = mongoose.model("Entry", entrySchema)