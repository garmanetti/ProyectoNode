const { json } = require("body-parser");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { User } = require("../../models");
const { JWT_SECRET } = require("../../constants");

module.exports = router => {
  //LOGIN
  router.post("/", json(), (req, res) => {
    User.findOne({ email: req.body.email })
      .then(doc => {
        return Promise.all([
          compare(req.body.password, doc.password),
          doc.toObject({
            transform(doc, ret, options) {
              delete ret.password;
              return ret;
            }
          })
        ]);
      })
      .then(([isValid, user]) => {
        if (!isValid) {
          throw new Error("Authentication failed, check your credentials");
        } else {
          res.json({
            user,
            token: sign({ id: user._id }, JWT_SECRET)
          });
        }
      })
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  });

  return router;
};
