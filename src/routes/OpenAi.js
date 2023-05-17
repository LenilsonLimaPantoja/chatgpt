const express = require("express");
const route = express.Router();

const openAiController = require("../controllers/openAi-controller.js");

route.post("/", openAiController.getOpenAi);

module.exports = route;
