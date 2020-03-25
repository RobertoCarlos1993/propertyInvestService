require("dotenv").config({
  path: "variables.env"
});
const {getAll, filter} = require("./db/queryProperties"); // query to retrieve all data from DB

var express = require("express"),
  app = express();

app.use(express.json());

app.get("/all", (req, res) => {
  getAll(req, res);
});

app.post("/filter", (req, res) => {
  filter(req, res);
});

app.listen(process.env.PORT);
