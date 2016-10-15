var express = require('express');
var app 	= express();

app.set('view engine', 'jade');

app.get('/',function(req,res){
	res.send('Hello World');
});

var server = app.listen(3000,function(){
	console.log('Our application is running at http://localhost:3000');
});