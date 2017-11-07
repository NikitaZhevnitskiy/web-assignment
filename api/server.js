var routes = require('./controllers');
var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 3000;
const mongoURI = require('./config/keys').mongoURI;

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => console.log('Listening on port: ' + port + '\nNODE_ENV: '+process.env.NODE_ENV + '\nmongoURI: '+mongoURI));



