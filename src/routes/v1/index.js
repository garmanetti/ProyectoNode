const { Router } = require("express");
const { json } = require("body-parser");
const UserRoutes = require("./user.routes");
const TweetRoutes = require("./tweet.routes");
const MiscRoutes = require("./misc.routes");

module.exports = router => {
  router.use("/", MiscRoutes(Router()));
  router.use("/users", UserRoutes(Router()));
  router.use("/tweets", TweetRoutes(Router()));

  return router;
};
