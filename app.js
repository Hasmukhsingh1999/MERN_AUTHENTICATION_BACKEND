const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnection = require("./database/db");

dotenv.config({ path: "./config/.env" });

dbConnection.Connection();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Define your routes and other application logic here.

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
