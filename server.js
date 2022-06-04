const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { dbuser, dbPassword } = process.env;
console.log(dbuser, dbPassword);
const url = `mongodb+srv://${dbuser}:${dbPassword}@cluster0.gpzb5.mongodb.net/Wobot`;
const csvRoutes = require("./routes/csvupload.js");
const routes = require("./routes");

const app = express();
// app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected...");
    },
    (err) => {
      console.log("Error found", err);
    }
  );

app.use("/", routes);
app.listen(8000, () => {
  console.log("Server Connected");
});
