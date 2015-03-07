var http = require('http');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
var db;

var config = {
	"USER" : "",
	"PASS" : "",
	"HOST" : "ec2-54-152-139-92.compute-1.amazonaws.com",
	"PORT" : "27017",
	"USER" : "my_example",
};

var dbPath = "mongodb://" + config.USER + ":" +
		config.PASS + "@" + 
		config.HOST + ":" + 
		config.PORT + "/" + 
		config.DATABASE;

var standardGreeting = 'Hello Jayesh!';

var greetingSchema = mongoose.Schema({
	sentence : String
});
var Greeting = mongoose.model('Greeting', greetingSchema);

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
	var greeting;
	Greeting.find( function(err, greetings){
		if(!greetings){
			greeting = new Greeting({sentence : standardGreeting});
			greeting.save();
		}
	});
});

app.get('/', function(req, res){
	Greeting.findOne(function (err, greeting){
		res.send(greeting.sentence);
	});
});

app.use(function(err, req, res, next){
 if (req.xhr) { 
 	res.send(500, 'Something went wrong!');
 	 }
 	 else { next(err); 
 	 } 
 });

console.log('starting the Express (NodeJS) Web server');
app.listen(8080);
console.log('Webserver is listening on port 8080');
