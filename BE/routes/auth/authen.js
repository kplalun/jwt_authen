const express = require("express");
const excute = require("../../utils/db");
const router = express.Router();
const bcrypt = require("bcrypt");
const { paramRequired } = require("../../utils/modules");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { user_name, user_pass } = req.body;

  if (user_name === undefined) {
    return res.send(paramRequired("username"));
  }
  if (user_pass === undefined) {
    return res.send(paramRequired("password"));
  }

  //   เข้ารหัส password
  const hashPassword = await bcrypt.hash(user_pass, 8);
  const result = await excute(
    "INSERT INTO users(user_name,user_pass) VALUES($1,$2)",
    [user_name, hashPassword]
  );
  console.log(result.status);
  if (result.status === 200) {
    res.json({
      message: "Registration successful",
    });
  } else {
    res.json({
      message: result.message,
      query: result.sql,
    });
  }
});

router.post("/login", async (req, res) => {
  const { user_name, user_pass } = req.body;

  if (user_name === undefined) {
    return res.send(paramRequired("username"));
  }
  if (user_pass === undefined) {
    return res.send(paramRequired("password"));
  }

  const text = "SELECT * FROM users WHERE user_name =$1";
  const values = [user_name];
  const checkUser = await excute(text, values);

  if (checkUser.result.length === 0) {
    res.json({ status: 404, message: "ไม่พบ User นี้" });
  } else {
    const result_password = checkUser.result.user_pass;

    const validatepass = await bcrypt.compare(user_pass, result_password);
    if (validatepass) {
      const token = jwt.sign(
        {
          username: checkUser.result.user_name,
          id: checkUser.result.user_id,
          role: checkUser.result.user_role,
          is_active: checkUser.result.is_active,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        status: 200,
        token,
        message: "Login successful",
      });
    } else {
      res.json({ status: 401, message: "รหัสผ่านไม่ถูกต้อง" });
    }
  }
});

router.get("/", async (req, res) => {
  res.json({
    status: 200,
    token,
    message: "Data",
  });
});

module.exports = router;
