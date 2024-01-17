const express = require("express");
const router = express.Router();
const excute = require("../../utils/db");
const bcrypt = require("bcrypt");
const { paramRequired } = require("../../utils/modules");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res) => {
  res.json({
    status: 200,
    message: "Data",
  });
});

module.exports = router;
