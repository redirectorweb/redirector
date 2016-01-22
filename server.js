"use strict";

var http = require('http');
var https = require('https');
var path = require('path');
var url = require('url');

var puerto = process.env.PORT || 8080;

http.createServer(onRequest).listen(puerto);

function onRequest(client_req, client_res)
{
	var fullUrl = decodeURIComponent(url.parse(client_req.url, true).query['url_solicitada']);
	// var ruta = "https://stackoverflow.com/questions/2011574/how-can-i-change-gridview-templatecolumn-order-dynamically";
	var ext = path.extname(fullUrl);

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