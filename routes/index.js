var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res) => res.render('home'));
// http://localhost:3000/


module.exports = router;
