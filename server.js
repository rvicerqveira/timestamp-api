var express = require('express')
var app = express()
var moment = require('moment')
var path = require('path')
var port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, './public')))
app.set('views', path.join(__dirname, "./templates"))
app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', { title: 'Timestamp Microservice' })
})

app.get('/:time', function (req, res) {
  var time = req.params.time
  var timestamp = {
    "unix": null,
    "natural": null
  }
  if(!isNaN(Number(time))){
    time = Number(time)*1000
  }
  time = new Date(time)
  if(!isNaN(time)){
    timestamp = {
      "unix": Number(moment(time).format("X")),
      "natural": moment(time).format("MMMM D, YYYY")
    }
  }
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(timestamp))
})

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!')
})