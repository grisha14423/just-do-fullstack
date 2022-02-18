const express = require("express");
const Importance = require("../models/Importance");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const importances = await Importance.find();
    res.status(200).send(importances);
  } catch (error) {
    res.status(500).json({
      message: "На сервере ошибка: " + error.message,
    });
  }
});

module.exports = router;
