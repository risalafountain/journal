const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
//hashpw
userSchema.pre('save', function (next){
    const user = this 
    if (!user.isModified('password'))
    return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err)
            return next(err)
        user.password = hash 
        next()
    })
})

//check pw 
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if (err) 
            return callback(err)
            return callback (null, isMatch)
    })
}

//remove pw from frontend 
userSchema.methods.withoutPassword = function (){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)

