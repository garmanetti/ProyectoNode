const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    text: {
      type: Schema.Types.String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
