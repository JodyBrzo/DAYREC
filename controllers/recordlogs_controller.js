
const express = require("express");
const router = express.Router();

const recordLogRepo = require("../repositories/recordLogRepository");
const express = require("express");

const router = express.Router();


const db = require("../models/");

module.exports = (app) => {
  
  router.post("/api/recordlogs", (req, res) => {
    db.recordlogs
      .create([""])({})
      .then(results => res.json(results));
  });
};
