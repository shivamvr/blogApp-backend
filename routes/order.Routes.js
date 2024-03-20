


const express = require('express')
const { OrderModel } = require('../model/order.model')
const { UserModel } = require('../model/user.model')
const { BookModel } = require('../model/book.model')
const { auth } = require('../middleware/auth.middleware')
const cors = require('cors')
const orderRouter = express.Router()

orderRouter.use(cors());


// order Book

orderRouter.use(auth)

orderRouter.post("/", async (req, res) => {

    const payload = { books: req.body.books, userID: req.body.userID }
    const books = payload.books
    let amount = 0
    for (let i = 0; i < books.length; i++) {
        const book = await BookModel.findOne({ _id: books[i] })
        amount += book.price
    }
    payload.totalAmount = amount

    const token = req.headers.authorization
    try {
        const order = new OrderModel(payload)
        await order.save()
        res.status(200).send({ "msg": "Order successful" })
    } catch (err) {
        res.status(400).send({ "Error": err })
    }
})

// Orders

orderRouter.post('/orders', async (req, res) => {
    console.log(req.body, 'body')
    try {
        if (req.body.isAdmin) {
            const orders = await OrderModel.find()
            res.status(200).send(orders)
        } else {
            res.status(400).send({ "msg": "You don't have the admin access" })
        }
    } catch (err) {
        res.send({ "Error": err })
    }
})


module.exports = { orderRouter }