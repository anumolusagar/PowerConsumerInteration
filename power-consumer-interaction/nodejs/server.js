var express = require('express');
var request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var http = require('http');

var app = express();
var port = process.env.PORT || 3000;
var httpsPort = process.env.HTTPS || 443;
var done = false;

// var httpContext = require('express-http-context');
// app.use(httpContext.middleware);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(err);
});

app.use(express.static(path.join(__dirname, 'app')));
var routes = require('./routes/route.js');
app.use('/api' , routes); 

//require('./nodejs/routes/route.js')(app);
app.get('/',function(request, response){
	console.log(path.join(__dirname + '../app/index.html'));
	response.sendFile(path.join(__dirname + '/../app/index.html')); 
});

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

//app.use(enforce.HTTPS());

httpServer.listen(port);
//httpsServer.listen(httpsPort);

console.log('App started on port : ' + port);

module.exports = app;