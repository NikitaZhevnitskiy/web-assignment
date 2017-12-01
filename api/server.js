const routes = require('./controllers');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoURI = require('./config/keys').mongoURI;
const ws = require('ws');
const async = require('async');
const userRepository = require('./repositories/user_repo');

app.use(bodyParser.json());
app.use('/', routes);
let httpServer;

let sockets = [];
// let publicTodos = [];
// initPublicTodos();

if(!module.parent) {
    httpServer = app.listen(port, () => console.log('Listening on port: ' + port + '\nNODE_ENV: ' + process.env.NODE_ENV + '\nmongoURI: ' + mongoURI));
    chat(httpServer);
}

// function initPublicTodos() {
//     userRepository.getAll({}, function (err, users) {
//         if(err) {return;}
//         // console.log
//
//         var arr = []
//         async.each(users, function(user, callback){
//             callback(()=>{
//                 arr=user.todolist;
//             })
//         })
//         users.forEach(user => {
//             var todoList = user.todolist;
//             publicTodos=publicTodos.concat(todoList);
//             // console.log(publicTodos);
//         })
//         // console.log(arr)
//     });
//
// }

// SOCKETS START
function chat(http_server) {
    const wsServer = new ws.Server({
        server: http_server,
    });

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
}


// SOCKETS END
module.exports = app;