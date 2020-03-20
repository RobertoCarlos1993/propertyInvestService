require("dotenv").config({
  path: "variables.env"
});
var request = require("request");

var express = require("express"),
  app = express();

app.use(express.json());

app.post("/filterProperty", (req, res) => {
  const query_values = req.body; // send from the f/e to b/e
  console.log('Params received:', query_values);
  // 1. Define the options prior to call
  const options_endpoint = {
    method: "GET",
    url: `${process.env.IP_DATA}:${process.env.IP_DATA_PORT_OPEN}/${query_values.endType}`
  };
  request(options_endpoint, function(error, response) {
    if (error) res.send(error);
    // results
    res.send(response.body);
  });
});

app.listen(process.env.PORT);
