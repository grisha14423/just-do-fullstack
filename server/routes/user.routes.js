const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.user);
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

module.exports = router;
