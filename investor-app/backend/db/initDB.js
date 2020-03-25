const { Pool } = require("pg");
const fs = require("fs");

let idealista_response = fs.readFileSync("idealista_api_response.json");
let properties = JSON.parse(idealista_response).elementList;
// clean-up fields "price", "address", "url", "size", "propertyType"

const client = new Pool({
  user: "robertocarlos",
  host: "localhost",
  database: "property",
  port: "5432"
});

client.connect();

client.query(
  "CREATE TABLE properties(id SERIAL PRIMARY KEY, price INT NOT NULL, address text NOT NULL, url INT NOT NULL, propertyType text NOT NULL, size INT NOT NULL)",
  (err, res) => {
    console.log(err, res);
    //client.end();
  }
);

properties.forEach(prop => {
  client.query(
    `INSERT INTO properties(price, address, url, propertyType, size)VALUES(${prop.price}, '${prop.address}', '${prop.url}', '${prop.propertyType}', ${prop.size})`,
    (err, res) => {
      console.log(err, res);
    }
  );
});

client.end();
