const routes = require('./controllers');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoURI = require('./config/keys').mongoURI;

app.use(bodyParser.json());
app.use('/', routes);
let httpServer;
if(!module.parent) {
    httpServer = app.listen(port, () => console.log('Listening on port: ' + port + '\nNODE_ENV: ' + process.env.NODE_ENV + '\nmongoURI: ' + mongoURI));
}


// SOCKETS START
const ws = require('ws');
const wsServer = new ws.Server({
    server: httpServer,
});
let sockets = [];
wsServer.on('connection', (socket) => {
    sockets.forEach(socket => socket.send("(server) New host connected"));
    sockets.push(socket);
    socket.send('(server) Hello, there!');

    socket.on('close', () => {
        console.log('disconnected');
        sockets = sockets.filter(savedSocket => savedSocket !== socket);
    });

    socket.on('message', text => {
        sockets.forEach(socket => socket.send(text));
    });
});
// SOCKETS END
module.exports = app;