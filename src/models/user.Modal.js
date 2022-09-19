const mongoose = require("mongoose");
const GlobalPackages = require('../global-package');
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
    account_type: {
      type: String,
      default: 'user'
    },
    token: {
      type: String,
      default: ''
    },
    otp: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
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
    // let oldPass = this.password
    // const verify = await bcrypt.compare(oldPass, this.password);
  }
  next()
})

const schemaModal = mongoose.model('user', schema);

module.exports = schemaModal;
