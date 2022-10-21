const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
const jwt = require("jsonwebtoken")
const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    image: {
      type: Buffer,
      required: true
    },
    role: {
      enum: ["admin", "user"]
    },
    login_try: {
      type: Number,
      default: 0
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await GlobalPackages.bcrypt.genSalt(10);
    this.password = await GlobalPackages.bcrypt.hash(this.password, salt);
  }
  next()
})

schema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

const userSchemaModal = mongoose.model('user', schema);

module.exports = userSchemaModal;
