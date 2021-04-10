const express = require("express");

const cors = require("cors");


require("./database");


const { request, response } = require("express");

const routes = require("./routes")

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

module.exports = app;