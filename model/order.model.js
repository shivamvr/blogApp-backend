

const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'books'}],
    totalAmount: Number
}, { versionKey: false })

const OrderModel = mongoose.model('order', orderSchema)

module.exports = { OrderModel }