var express = require('express');
var path = require('path');

var routes = require('./routes/index');
var crawler = require('./routes/crawler');

var app = express();

console.log(__dirname); //DEBUG
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//specifying the applicacion entry
// when the HTTP reques is '/' execute the routes=./routes/index controller
app.use('/', routes);
//TODO-2
//when the HTTP reques is '/crawler' execute the crawler=./routes/crawler controller
//app.use(....);
app.use('/crawler', crawler); 


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// HTTP server listening on port 8080
//TODO-1 app.listen(...)
var port = 9103
app.listen(port,function() {
    console.log("Server running on port: "+port);
});

module.exports = app;
