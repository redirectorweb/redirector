"use strict";

var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');

http.createServer(onRequest).listen(80);
console.log("Server initiated");

function onRequest(client_req, client_res)
{
	var fullUrl = decodeURIComponent(url.parse(client_req.url, true).query['url_solicitada']);
	// var ruta = "https://stackoverflow.com/questions/2011574/how-can-i-change-gridview-templatecolumn-order-dynamically";
	var ext = path.extname(fullUrl);

	console.log('Cliente: ' + client_req.url);

	var protocolo = undefined;

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