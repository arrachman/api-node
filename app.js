var app = require('express')()
fs = require('fs');
require('dotenv/config')
app.use(require('body-parser').json()) // Parses json, multi-part (file), url-encoded
help = require('./config/help')
res = new help.Helpfix()
knex = require('knex')({client: 'mysql', connection: { host:'103.55.39.194', user: 'teestmasu_user', port: 3306, password: 's4ntr1nuh42009', database: 'teestmasu_user'}})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./api').app(app)

require('reload')(app).then(function () {
  require('http').createServer(app).listen(process.env.PORT || 15001, function () {
    console.log('Web server listening on port ' + process.env.PORT || 15001)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})