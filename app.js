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
const userRoutes = require("./routes/user.routes");
const { AppError } = require("./utils/error.handling");
app.use("/api/user", userRoutes);

// Error Handling
app.use((err, req, res) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
