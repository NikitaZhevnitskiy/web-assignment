const routes = require('./controllers');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoURI = require('./config/keys').mongoURI;
const ws = require('ws');
const userRepository = require('./repositories/user_repo');

app.use(bodyParser.json());
app.use('/', routes);
let httpServer;

let sockets = [];

if(!module.parent) {
    httpServer = app.listen(port, () => console.log('Listening on port: ' + port + '\nNODE_ENV: ' + process.env.NODE_ENV + '\nmongoURI: ' + mongoURI));
    chat(httpServer);
}


// SOCKETS START
function chat(http_server) {
    const wsServer = new ws.Server({
        server: http_server,
    });

    wsServer.on('connection', (socket) => {
        sockets.forEach(socket => socket.send("(server) New host connected"));
        sockets.push(socket);
        socket.send('(server) Hello, there!');

        // push public items
        userRepository.getAll({},(err,users)=>{
            users.forEach(user => {
                var todoList = user.todolist;
                todoList.forEach(item=>{
                    if(item.public){
                        var str =`(server): {${item.id},${item.title},${item.description},${item.public}}`;
                        console.log(str);
                        socket.send(str)
                    }
                })
            })
        });

        socket.on('close', () => {
            console.log('disconnected');
            sockets = sockets.filter(savedSocket => savedSocket !== socket);
        });

        socket.on('message', text => {
            sockets.forEach(socket => socket.send(text));
        });
    });
}


// SOCKETS END
module.exports = app;