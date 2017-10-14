var routes = require('./api/controllers');
var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 1234;
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => console.log('Listening on port ' + port));

