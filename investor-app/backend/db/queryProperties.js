const { Pool } = require("pg");

const client = new Pool({
  user: `${process.env.PGUSER}`,
  host: `${process.env.PGHOST}`,
  database: `${process.env.PGDATABASE}`,
  port: `${process.env.PGPORT}`
});

client.connect();

const getAll = (request, response) => {
  client.query("SELECT * FROM PROPERTIES", (error, data) => {
    if (error) {
      throw error;
    }
    response.status(200).json({ data: data.rows, length: data.length });
  });
};

const filter = (request, response) => {
  const body = request.body;
  console.log(body);
  client.query(
    `SELECT * FROM PROPERTIES WHERE propertyType='${body.propertyType}' AND price <= ${body.price} AND size <= ${body.size} `,
    (error, data) => {
      if (error) {
        throw error;
      }
      response.status(200).json({ data: data.rows, length: data.length });
    }
  );
};

module.exports = {
  getAll,
  filter
};
