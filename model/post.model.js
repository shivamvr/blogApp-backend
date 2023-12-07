

const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: String,
    name: String
},{versionKey: false})

const PostModel = mongoose.model('post',postSchema)

module.exports = {PostModel}