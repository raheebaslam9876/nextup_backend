const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'NFT name is required']
    },
    image: {
        type: Buffer,
        required: [true, 'Image is required']
    },
    nft_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    properties: {
        type: String,
        required: [true, 'properties are required']
    },
    collection_id: {
        type: Number
    },
    Royalties: {
        type: Number
    },
    creator_id: {
        type: Number
    },
    contract_type: {
        type: String
    },
    athlete_token_id: {
        type: Number
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isDisable: {
        type: Boolean,
        default: false
    },
    nft_owner: {
        type: Array,
        default: []
    },
    blockchain: {
        type: String
    },
    isSold: {
        type: Boolean,
        default: false
    },
    likes: {
        type: Number
    },
    views: {
        type: Number
    },
    file_hash: {
        type: String
    }
});
const nftSchemaModal = mongoose.model('nft', schema);
module.exports = nftSchemaModal;
