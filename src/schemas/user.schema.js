const { Schema } = require("mongoose");
const { isEmail } = require("validator");

module.exports = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
      validate: isEmail
    },
    username: {
      type: Schema.Types.String,
      required: true
    },
    password: {
      type: Schema.Types.String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
