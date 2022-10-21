const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'NFT name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    image: {
        type: Buffer,
        required: [true, 'Image is required']
    }
});

const nftSchemaModal = mongoose.model('nft', schema);
module.exports = nftSchemaModal;
