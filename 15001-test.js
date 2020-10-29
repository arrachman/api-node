var app = require('express')()
fs = require('fs');
require('dotenv/config')
app.use(require('body-parser').json()) // Parses json, multi-part (file), url-encoded
help = require('./config/help')
res = new help.Helpfix()
knex = require('knex')({client: 'mysql', connection: { host:process.env.DB_HOST, user: process.env.DB_USER, port: process.env.DB_PORT, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE}})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./api').app(app)

require('reload')(app).then(function () {
  require('http').createServer(app).listen(15001, function () {
    console.log('Web server listening on port ' + 15001)
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})
try {
  const { Client } = require('pg')
  const client = new Client()

  const test = async() => {
    await client.connect()
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    console.log(res.rows[0].message) // Hello world!
    await client.end()
  }
  test()
}
catch (err) {
  // console.log('err', err.stack)
}
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })