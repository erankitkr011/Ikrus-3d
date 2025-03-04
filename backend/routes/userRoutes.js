const express = require("express");
const {uploadModel} = require("../controllers/upload");
const { getModels } = require("../controllers/modelController");

const Router = express.Router();

Router.post("/upload", uploadModel);
Router.get("/models", getModels);

module.exports = Router;
