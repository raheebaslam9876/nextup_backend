const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
const jwt = require("jsonwebtoken")
const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required.'],
    },
    name: {
      type: String,
      required: [true, 'Name is required.'],
    },
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
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

schema.methods.createJWTToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    this.tokens = [{ token }];
    await this.save()
    return token;
    // // const userVerify = jwt.verify(token, process.env.JWT_SECRET);
    // // console.log(userVerify);
  } catch (error) {
    console.log("error MODAL LOGs", error)
  }
}

const adminSchemaModal = mongoose.model('admin', schema);
module.exports = adminSchemaModal;
