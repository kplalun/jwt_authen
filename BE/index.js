const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authen = require("./routes/auth/authen");
const user = require("./routes/user/user");
const { protect } = require("./middleware/protect");

const port = process.env.PORT;
// ใช้รับข้อความที่เป็น json ที่แนบมากับ body ได้
app.use(express.json());
app.use(cors());

app.use("/auth", authen);
app.use("/user", protect, user);

app.listen(port, function () {
  console.log("App start on port " + port);
});
