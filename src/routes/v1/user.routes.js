const { hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../../models");
const { JWT_SECRET } = require("../../constants");
const checkJwt = require("express-jwt");

module.exports = router => {
  router.post("/users", (req, res) => {
    hash(req.body.password, 10)
      .then(hash => {
        return User.create({
          email: req.body.email,
          hash
        });
      })
      .then(doc => {
        const token = sign({ id: doc._id }, JWT_SECRET);
        res.json({
          user: doc.toObject({
            transform(doc, ret, options) {
              delete ret.hash;
              return ret;
            }
          }),
          token
        });
      })
      .catch(error => {
        res.send(error);
      });
  });

  return router;
};
