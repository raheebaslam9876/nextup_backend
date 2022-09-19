const mongoose = require("mongoose");

const errorSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      default: '',
    },
    error_message: {
      type: String,
      default: '',
    },
    error_type: {
      type: String,
      default: 'general'
    },
    error_row: {
      type: String,
      default: ''
    },
  },
  {
    timestamps: true,
  }
);


const Error = mongoose.model('error', errorSchema);

module.exports = Error;
