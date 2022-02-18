const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/note", require("./note.routes"));
router.use("/importance", require("./importance.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
