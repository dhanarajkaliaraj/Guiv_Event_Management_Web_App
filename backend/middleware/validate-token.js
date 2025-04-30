const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const validateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('validateToken',token);
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decreptedObj = jwt.verify(token, SECRET_KEY);
    console.log('validateToken',decreptedObj);
    req.user = decreptedObj;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = validateToken;
