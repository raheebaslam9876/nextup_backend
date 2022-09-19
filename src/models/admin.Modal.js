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
    organization_name: {
      type: String,
      required: [true, 'Organization is required.'],
    },
    account_type: {
      type: String,
      default: 'admin'
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
    account_approval: {
      type: Boolean,
      default: false
    },
    login_try: {
      type: Number,
      default: 0
    },
    connect_account: {
      type: mongoose.Types.ObjectId, ref: 'connect',
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

const schemaModal = mongoose.model('admin', schema);

module.exports = schemaModal;
