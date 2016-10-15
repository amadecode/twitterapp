var express = require('express');
var bodyParser = require('body-parser');
var usersList = require('./user-list');
var app 	= express();

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static(__dirname + '/public'));

app.get('/',function(req,res){
	// res.send('Hello World');
	res.render('index');
});

app.post('/get_users',function(req, res){
	var screen_name = req.body.handle;
	
	var users = usersList(res, screen_name);
});

var server = app.listen(3000,function(){
	console.log('Our application is running at http://localhost:3000');
});