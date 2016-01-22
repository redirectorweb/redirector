"use strict";

const Http = require('http');
const Https = require('https');
const Url = require('url');
//const Browser = require('zombie');

var puerto = process.env.PORT || 8080;

Http.createServer(onRequest).listen(puerto);

function onRequest(client_req, client_res)
{
	var urlSolicitada = Url.parse(client_req.url, true).query['q'];

	if(urlSolicitada !== undefined)
	{
		var protocolo = undefined;

		if(urlSolicitada.indexOf("https") > -1)
			protocolo = Https;
		else
			protocolo = Http;

		// const browser = new Browser();

		// browser.localhost('example.com', 5000);

		// browser.pipeline.addHandler(function(browser, request, response) {
			// console.log('Response body: ' + response.body);
		// });

		// browser.visit('/path', function() {
			// console.log(browser.location.href);
		// });

		var proxy = protocolo.get(urlSolicitada, function (server_response)
		{
			server_response.pipe(client_res, {end: true});
		});

		client_req.pipe(proxy, {end: true});
	}
}
