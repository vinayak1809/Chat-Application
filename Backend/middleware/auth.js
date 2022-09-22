const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("authorization");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.id = decoded.id;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "login first" });
  }
};

module.exports = { authenticate };
