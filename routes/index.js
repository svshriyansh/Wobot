const auth = require("./auth");
const csvUpload = require("./csvupload");
const router = require("express").Router();
router.use("/auth", auth);
router.use("/csvTest", csvUpload);
module.exports = router;
