

const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    userID: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    name: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
}, { versionKey: false })

const BookModel = mongoose.model('book', bookSchema)

module.exports = { BookModel }


