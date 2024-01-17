const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  try {
    // เช็คว่า token แนบมากับ header ไหม
    const token = req.headers["authtoken"];
    if (!token) {
      return res.status(401).json({
        message: "No Token",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          message: "Token is invalid",
        });
      }
      //ส่งไปกับ req
      req.user = payload;
      next();
    });
  } catch (error) {
    console.log(error);
    res.send("Token Invalid").status(500);
  }
};
