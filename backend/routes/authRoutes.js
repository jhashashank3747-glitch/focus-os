const express = require("express");
const router = express.Router();

// Example route
router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT ✅");
  res.send("Auth route working ✅");
});

module.exports = router;
