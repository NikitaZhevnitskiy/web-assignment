const routes = require('./controllers');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoURI = require('./config/keys').mongoURI;

app.use(bodyParser.json());
app.use('/', routes);
if(!module.parent) {
    app.listen(port, () => console.log('Listening on port: ' + port + '\nNODE_ENV: ' + process.env.NODE_ENV + '\nmongoURI: ' + mongoURI));
}

module.exports = app;



