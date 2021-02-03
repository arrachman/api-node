var app = require('express')()
fs = require('fs');
require('dotenv/config')
app.use(require('body-parser').json()) // Parses json, multi-part (file), url-encoded test test
help = require('./config/help')
res = new help.Helpfix()
knex = require('knex')({client: 'mysql', connection: { host:'103.149.46.78', user: 'erpfixc1', port: 3306, password: 'QPd]+44u96jFWq', database: 'erpfixc1_root'}})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./api').app(app)

  require('http').createServer(app).listen(process.env.PORT || 15001, function () {
    console.log('Web server listening on port ' + process.env.PORT || 15001)
  })
