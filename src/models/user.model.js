const { model } = require("mongoose");
const UserSchema = require("../schemas/user.schema");

module.exports = model("User", UserSchema);
