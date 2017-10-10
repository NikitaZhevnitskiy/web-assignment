const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// middleware
app.use(bodyParser.json());

//controllers
require('./api/controllers')(app);


app.listen(1234, () => console.log('listening on http://localhost:1234/'));
