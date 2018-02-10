var express = require('express');
var path = require('path');
var ghost = require('./blog/ghost-in-the-middle');
const app = express();
var http = require('http').Server(app);
 
const vhost = (hostname, app) => (req, res, next) => {
 
	const host = req.headers.host.split('.')[0];	 
	console.log(host);	 
	if(host === hostname){
		return app(req, res, next);
	} else { 
		next();	
	} 
}
 
app.use(vhost('blog', ghost({
    config: path.join(__dirname, 'config.development.json')
})))

app.get('/', (req, res) => res.send('any express app'))

var port = process.env.PORT || 3000;
http.listen(port, function() {
    console.log("server running");
})

