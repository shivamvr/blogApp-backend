

const express = require('express')
const { PostModel } = require('../model/post.model')
const cors = require('cors')
const allPostRouter = express.Router()

allPostRouter.use(cors());

// Get  post

allPostRouter.get('/', async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.status(200).send(posts)
    } catch (err) {
        res.send({ "Error": err })
    }
})



module.exports = { allPostRouter }