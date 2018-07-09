var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  var options = {root: '../views/'};
  res.sendFile('index.html', options);
});

//exporting the controller
module.exports = router;
