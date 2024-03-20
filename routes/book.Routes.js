



const express = require('express')
const { BookModel } = require('../model/book.model')
const { auth } = require('../middleware/auth.middleware')
const cors = require('cors')
const bookRouter = express.Router()
bookRouter.use(cors());


// post Book

bookRouter.use(auth)

bookRouter.post("/add", async (req, res) => {
    const payload = req.body
    const token = req.headers.authorization
    // console.log(req.body, token)
    try {
        const post = new BookModel(payload)
        await post.save()
        res.status(200).send({ "msg": "A new book has been added" })
    } catch (err) {
        res.status(400).send({ "Error": err })
    }
})

// Get Books

bookRouter.get('/', async (req, res) => {
    try {
        const posts = await BookModel.find({ name: req.body.name })
        res.status(200).send(posts)
    } catch (err) {
        res.send({ "Error": err })
    }
})

// Get book by Id

bookRouter.patch("/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    console.log(req.body)
    try {
        const post = await BookModel.findOne({ _id: id })
        await BookModel.findByIdAndUpdate(id, payload)
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send({ "msg": "post not found" })
    }
})

// patch

bookRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body
    const id = req.params.id
    console.log(id)
    console.log(req.body)
    try {
        const post = await BookModel.findOne({ _id: id })
        if (post.name == req.body.name) {
            await BookModel.findByIdAndUpdate(id, payload)
            res.status(200).send({ "msg": "book updated" })
        } else {
            res.status(400).send({ "msg": "You are not authorize" })
        }
    } catch (err) {
        res.status(400).send({ "msg": "post not found" })
    }
})

// delete

bookRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const post = await BookModel.findOne({ _id: id })
        if (post.name == req.body.name) {
            await BookModel.findByIdAndDelete(id)
            res.status(200).send({ "msg": "book has been successfully deleted" })
        } else {
            res.status(400).send({ "msg": "You are not authorize" })
        }
    } catch (err) {
        res.status(400).send({ "msg": "book not found" })
    }
})

module.exports = { bookRouter }