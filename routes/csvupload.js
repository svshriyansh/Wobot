const router = require("express").Router();
const multer = require("multer");
const uploads = multer({ dest: "uploads/" });
const csv = require("csv-parser");
const fs = require("fs");
const product = require("../models/Product");
const authenticationToken = require("../middleware/auth");
const jwt_decode = require("jwt-decode");
const user = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const data = await product.find();
    res.send(data);
  } catch (error) {
    res.json(error);
  }
});
router.post(
  "/",
  authenticationToken,
  uploads.single("file"),
  async (req, res) => {
    const name = await user.findOne({ username: req.user.username });
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", async (data) => {
        results.push({ ...data, createdBy: name.firstname });
      })
      .on("end", async () => {
        console.log(results);
        const products = await product.insertMany(results);
        res.send(products);
      });
  }
);

module.exports = router;
