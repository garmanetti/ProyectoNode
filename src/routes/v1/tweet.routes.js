const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Tweet } = require("../../models");
const { JWT_SECRET } = require("../../constants");
const checkJwt = require("express-jwt");

module.exports = router => {
  return router;
};
