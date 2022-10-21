const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    DOB: {
        type: Date
    },
    tokenName: {
        type: String,
        default: ''
    },
    college: {
        type: String,
        required: [true, 'College is required']
    },
    sport: {
        type: String,
        required: [true, 'Sport is required']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required']
    },
    about: {
        type: String,
        required: [true, 'About is required']
    },
    image: {
        type: Buffer
    }

});

schema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await GlobalPackages.bcrypt.genSalt(10);
        this.password = await GlobalPackages.bcrypt.hash(this.password, salt);
    }
    next()
})

const athleteSchemaModal = mongoose.model('athlete', schema);
module.exports = athleteSchemaModal;