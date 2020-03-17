require("dotenv").config({
  path: "variables.env"
});
var request = require("request");

const URL_API_DATA = process.env.URL_DATA;
const URL_REQUEST_AUTH = process.env.URL_REQUEST_AUTH;

const ENCODE_CREDENTIALS = Buffer.from(
  `${process.env.API_KEY}:${process.env.API_SECRET}`
).toString("base64");

// 1. REQUEST THE AUTH TOKEN
var options = {
  method: "POST",
  url: `${URL_REQUEST_AUTH}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${ENCODE_CREDENTIALS}`
  },
  form: {
    grant_type: "client_credentials"
  }
};

request(options, function(error, response) {
  if (error) throw new Error(error);
  // print body and inspect token
  console.log(response.body);
});
