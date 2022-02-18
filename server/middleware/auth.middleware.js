const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next;
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const data = tokenService.validateAccess(token);

    // console.log("Decoded token: ", token);
    // console.log("Decoded data: ", data);

    req.user = data;

    next();
  } catch (e) {
    return res.status(400).json({ message: "Unauthorized" });
  }
};
