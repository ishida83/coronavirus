const express = require('express');
const path = require('path');
const app = express();
const port = 9000;


const jsonServer = require('json-server');
const jsonRouter = jsonServer.router(path.join(__dirname, 'db.json'));
// const jsonServerInstance = jsonServer.create();
const jsonMiddlewares = jsonServer.defaults();

// jsonServerInstance.use(jsonMiddlewares);
// jsonServerInstance.use(jsonServer.bodyParser);
// jsonServerInstance.use(jsonRouter);
// jsonServerInstance.listen(9001, () => {
//   console.log('JSON Server is running on 9001');
// });

Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get: function () { return this.get('Client-IP') }
});

require('http').globalAgent.options.keepAlive = true;
require('https').globalAgent.options.keepAlive = true;
require('http').globalAgent.maxSockets = 5000;
require('https').globalAgent.maxSockets = 5000;

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(express.static(path.join(__dirname, '../', 'build')));

app.use('/api', jsonMiddlewares, jsonServer.bodyParser, jsonRouter);

app.get(['/', '/admin*'], function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    console.debug('HTTP server closed')
  })
});