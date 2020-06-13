const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')
const app = express();


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(routes)


app.listen(3333);