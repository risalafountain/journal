const express = require('express')
const entryRouter = express.Router()
const Entry = require ('../models/entry')

//get entries by userId <works>
entryRouter.get('/user', (req, res, next) => {
    Entry.find({ user: req.auth._id}, (err, entries) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(entries)
    })
})

//add new note <works>
entryRouter.post('/', (req, res, next) => {
    //once user is setup use this
    req.body.user = req.auth._id
    req.body.username = req.auth.username
    console.log(req.body.user)
    
    const newNote = new Entry(req.body)
    newEntry.save((err, savedEntry) => {
        if(err) {
            res.status(500)
            return next (err)
        }
        console.log(savedEntry)
        res.status(201).send(savedEntry)
    })
})

//delete entry <works>
entryRouter.delete('/:entryId', (req, res, next) =>{
    Entry.findOneAndDelete(
        {_id: req.params.entryId, user: req.auth._id},
        (err, deletedEntry) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send
            (`Successfully Deleted Journal Entry: ${deletedEntry.title}`)
        }
    )
})

//edit Entry <works>
entryRouter.put('/:entryId', (req, res, next) => {
    Entry.findOneAndUpdate(
        {_id: req.params.entryId, user: req.auth._id},
        req.body,
        {new: true},
        (err, updatedEntry) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedEntry)
        }
    )
})

module.exports = entryRouter