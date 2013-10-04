var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname))
 .listen(9001);
console.log("Listening on 9001");