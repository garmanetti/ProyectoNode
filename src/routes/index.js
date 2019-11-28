const { Router } = require("express");
const v1 = require("./v1");
//const v2 = require("./v2");

module.exports = router => {
  router.use("/", v1(Router()));
  //router.use("/v2", v2(Router()));

  return router;
};
