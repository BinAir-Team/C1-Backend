const express = require("express");
const app = express();
const router = require("../config/routes");
const methodOverride = require("method-override");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

/** Install express-session */
app.set("trust proxy", 1); // trust first proxy

/** set the view engine to ejs */
app.set("view engine", "ejs");

// method override
app.use(methodOverride("_method"));

/** set up public */
app.use(express.static(path.join(__dirname, "../public")));

app.use(router);

module.exports = app;
