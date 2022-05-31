const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("../routes/auth/auth-routes");
const userRouter = require("../routes/users/users-routes");
const restricted = require("../routes/auth/restricted-middleware");

const app = express();
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ success: true, message: "Welcome to db blog backend" });
});

app.use("/api/auth", authRouter);

app.use("/api/users", restricted, userRouter);

module.exports = app;
