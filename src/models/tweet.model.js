const { model } = require("mongoose");
const TweetSchema = require("../schemas/tweet.schema");

module.exports = model("Tweet", TweetSchema);
