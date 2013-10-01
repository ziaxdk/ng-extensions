var express = require('express'), http = require('http')
    ;

var app = express();
var theServer = http.createServer(app);
app.use(express.bodyParser());

app.use(express.static(__dirname + "/test/directives"));
app.get('/validate', function (req, res) {
  console.log(req.query);
  res.send(req.query.q === 'true');
});
var port = process.env.PORT || 8080;
theServer.listen(port, function () {
    console.log("Listening on " + port);
});