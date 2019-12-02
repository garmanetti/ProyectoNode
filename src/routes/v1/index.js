const { Router } = require("express");
const UserRoutes = require("./user.routes");
const TweetRoutes = require("./tweet.routes");
const SessionRoutes = require("./session.routes");

module.exports = router => {
  router.use("/sessions", SessionRoutes(Router()));
  router.use("/users", UserRoutes(Router()));
  router.use("/tweets", TweetRoutes(Router()));

  return router;
};
