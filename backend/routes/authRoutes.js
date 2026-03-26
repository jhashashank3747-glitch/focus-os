const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/authController");

console.log("Auth routes initialized", signup); // DEBUG
// ✅ Routes
router.post("/signup", signup);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.send("Auth route working ✅");
});

module.exports = router;
console.log("Auth routes exported"); // DEBUG