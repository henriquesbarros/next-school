var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res) => {
  return res.send("Home.")
});

module.exports = router;
