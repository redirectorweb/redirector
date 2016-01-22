"use strict";

var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');

var puerto = process.env.PORT || 8080;

http.createServer(onRequest).listen(puerto);

function onRequest(client_req, client_res)
{
	var fullUrl = url.parse(client_req.url, true).query['url_solicitada'];
	var ext = path.extname(fullUrl);

	var protocolo = undefined;

	// var fullUrl = "http://i.imgur.com/wpwet06.jpg";
	// http%3A%2F%2Fi.imgur.com%2Fwpwet06.jpg
	console.log(url.parse(client_req.url, true).query['url_solicitada']);

	if(fullUrl.indexOf("https") > -1)
		protocolo = https;
	else
		protocolo = http;

	var proxy = protocolo.get(fullUrl, function (server_response)
	{
		server_response.pipe(client_res, {end: true});
	});

	client_req.pipe(proxy, {end: true});
}