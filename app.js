var express = require('express'),
	app = express(),
	server = require('http').createServer(app).listen(8000);

	app.set('view engine', 'jade');
	app.use(express.static( __dirname+'/static'));


app.get('/', function(req, res){
	res.render('index');
})
