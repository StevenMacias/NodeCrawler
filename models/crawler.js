var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
var url = require('url');
var path = require('path');

function doCrawlAndDownload(_uri, callback) {
  // TODO: definiu les següents variables:
  // var array dels detalls de les imatges = [];
  // var comptador del nombre de imatges descarregades
  // var comptador del nombre d'imatges processades.
  // var codi d'error a passar-li a la callback.
  // Si hi ha error -1. Inicialment = 0;
  var errorCode = 0;
  var numberOfImg = 0;
  var itemsProcessed = 0;
  var imagesJson = {
    details: []
  }

  //TODO-6
  /*request(......function(.....){
    if(!error && response.statusCode == 200) {
      //TODO-7
      //TODO-8
      //TODO-9
      //TODO-10
      (function(.....)){
        //TODO-11
      })(......);
    }else{
      //TODO-12
    }

  }); //end request */
  request(_uri, function(error, response, body) {
    //crawlejar body
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      console.log("CHERIOS IMG LEN: " + $('img').length)
      numberOfImg = $('img').length;
      $('img').each(function(i, elem) {
        var img = $(this).attr('src');

        if (img.indexOf("//") !== -1) {
          //Remote Image
          console.log(img);
          fullUrl = img;
        } else {
          //Local Image
          fullUrl = url.resolve(_uri, img);
          console.log(fullUrl);
        }
        var name = path.basename(fullUrl)
        console.log(name);
        (function(name, fullUrl) {
          var fileOS = fs.createWriteStream(name);
          //request.get(fullUrl).pipe(fileOS);
          request.get(fullUrl)
            .on("response", function(response) {
              //Obtenir el valor de la capçalera content-length
              //afegir aquesta dada a l’objecte JSON de la imatge
              // {name: ’img1.jpg’, size: valor del content-lenth
              // en aquest moment tenim l’objecte JSON amb tots els detalls
              // de la imatge. Ara ja el podem desar a la llista.
              if (response.statusCode == 200) {
                var size = response.headers["content-length"];
                console.log("size: " + size);
                this.pipe(fileOS);
                imagesJson['details'].push({
                  name: name,
                  size: size
                });
                console.log(imagesJson)
                itemsProcessed++;
                if (itemsProcessed == numberOfImg) {
                  callback(errorCode, imagesJson);
                }
              }

            });
        })(name, fullUrl);
      });

    } else {
      errorCode = -1;
      callback(errorCode, imagesJson);
    }
  });

} //end doCrawl

exports.doCrawlAndDownload = doCrawlAndDownload;
