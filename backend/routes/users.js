const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.patch("/me", verifyToken, usersCtrl.update);
router.delete("/me", verifyToken, usersCtrl.deleteAccount);

module.exports = router;
