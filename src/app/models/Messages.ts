import mongoose from 'mongoose'

const {Schema} = require('mongoose')

const messagesSchema = new Schema({
    user: {
        type: String,
        required: [true, "user is required"],
        trim: true
    },
    date: {
        type: String,
        required: [true, "date is required"],
        trim: true
    },
    message: {
        type: String,
        required: [true, "message is required"],
        trim: true
    }
})

const messages = mongoose.models.messages || mongoose.model("messages", messagesSchema)

export default messages