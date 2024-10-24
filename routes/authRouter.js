const express = require('express')
const authRouter = express.Router()
const User = require ('../models/user')
const jwt = require ('jsonwebtoken')

//signup
authRouter.post('/signup', (req, res, next) => {
    //check if user exists
    User.findOne({ username: req.body.username.toLowerCase() },
        (err, user) => {
            if (err) {
                res.status(500)
                return next(err)
            }

            //if user exists do not let them sign up 
            if (user) {
                res.status(403)
                return next(new Error('That username is already taken!'))
            }

            //if they don't exist, create new user 
            const newUser = new User(req.body)
            newUser.save((err, savedUser) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                
                // need payload and secret
                const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
                return res.status(201).send({token, user: savedUser.withoutPassword()})
            })
        })
})

//login
authRouter.post('/login', (req, res, next) => {
    //is user exists, checkPW
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        //if they are NOT a user
        if (!user) {
            res.status(403)
            return next(new Error('Username or password are incorrect.'))
        }
        //check if PW does NOT match user 
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error('The Username or Password are incorrect'))
            }

            if (!isMatch) {
                res.status(403)
                return next(new Error('The Username or Password are incorrect'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            console.log('jwt token:', token)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })
    })
})

module.exports = authRouter