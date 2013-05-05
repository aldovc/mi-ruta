var server = require('restify').createServer();


function respond(req, res, next) {
  console.log("req.params.origin:" + req.params.origin);
  console.log("req.params.destintion:" + req.params.destination);
  res.send('OK');
}
server.get('/routes/:origin/:destination', respond);
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
