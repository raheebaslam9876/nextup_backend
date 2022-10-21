const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    }
})

const tokenModal = mongoose.model('token', schema)
module.exports = tokenModal;