const express = require("express");
const app = express();
const router = require("../config/routes");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:8000",
      "https://binair-backend-production.up.railway.app",
    ],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

/** Install express-session */
app.set("trust proxy", 1); // trust first proxy

app.use(router);

module.exports = app;
