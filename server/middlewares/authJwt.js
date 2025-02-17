const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "Access denied" });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authJwt = {
  verifyToken,
};
module.exports = { verifyToken };
