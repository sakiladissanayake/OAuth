//import express, body-parser and oauth2-server
var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.oauth = oauthserver({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/gettoken', app.oauth.grant());

app.get('/getuser', app.oauth.authorise(), function (req, res) {
	res.json({id:'IT15027498' ,name:'Sakila',department:'Computing',city:'Malabe'});
});

app.use(app.oauth.errorHandler());

app.listen(4000);
