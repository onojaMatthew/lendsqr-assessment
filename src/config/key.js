const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname + "/../../.env")});

module.exports = ({
  SECRET_KEY: process.env.SECRET_KEY,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME
});
   