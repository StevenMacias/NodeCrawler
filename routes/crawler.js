var express = require('express');
var router = express.Router();

/* what to do when the module is used */
router.get('/', function(req, res) {
  console.log("crawler");
  //TODO-3
  //load the model module
  var crawler = require("../models/crawler");


  //TODO-4
  //define the var to store de link
  //uri = 'http://' + var with the link
  var _uri = req.query.uri
  console.log(req.query.uri)
  //TODO-5
  crawler.doCrawlAndDownload(_uri, function(error, images_details) {
    if (error == 0) {
      //URI Exists we have the data
      res.render("crawler.ejs", {
        details: JSON.stringify(images_details)
      });

    } else {
      //Render not found
      var options = {
        root: '../views/'
      };
      res.sendFile('notFound.html', options);
    }
  })

  var options = {
    root: '../views/'
  };


}); //end router.get

//exporting the controller
module.exports = router;
