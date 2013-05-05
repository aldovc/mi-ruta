var server = require('restify').createServer();
var pg = require("pg");
var conString = "pg://apidispatcher:h4ck4th0n@localhost:5432/sample";
var client = new pg.Client(conString);
client.connect();


function respond(req, res, next) {
  var query = client.query('SELECT NOW() AS "time"');
  query.on('row', function(row, result) {
    result.addRow(row);
  });

  query.on("end", function(result) {
   console.log(result.rows); 
   res.send(result.rows);
  });
}
server.get('/routes/:origin/:destination', respond);
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
