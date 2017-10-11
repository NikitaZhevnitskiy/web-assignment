var routes = require('./api/controllers');
var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , port = process.env.PORT || 1234;
app.use(bodyParser.json());

// Add headers
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

app.use('/', routes);








// const jwtSimple = require('jwt-simple');
// const bcrypt = require('bcryptjs');


// const jwtSecret = 'top super secret password do not share';
//
//
// app.get('/', (req, res) => {
//     res.send('hello');
// });
//
// const users = [];
//
// app.get('/users', (req, res) => {
//     res.send(users);
// });
//
// app.post('/users', (req, res) => {
//     const user = req.body;
//
// if (!user.username) {
//     res.status(400).send('Must contain username');
//     return;
// }
//
// if (!user.password) {
//     res.status(400).send('Must contain password');
//     return;
// }
//
// const userWithHashedPassword = {
//     username: user.username,
//     password: bcrypt.hashSync(user.password, 10),
// }
//
// users.push(userWithHashedPassword);
// res.status(201).send();
// });
//
// app.post('/login', (req, res) => {
//     const user = req.body;
//
// if (!user.username) {
//     res.status(400).send('Must contain username');
//     return;
// }
//
// if (!user.password) {
//     res.status(400).send('Must contain password');
//     return;
// }
//
// // 1. finn brukeren by brukernavn
// const matchedUser = users.find(potentialMatch => potentialMatch.username === user.username);
//
// if (matchedUser == null) {
//     res.status(401).send('No such user');
//     return;
// }
//
// // 2. sammenlikn passord
// const passwordMatches = bcrypt.compareSync(
//     user.password,
//     matchedUser.password
// );
//
// // 3. hvis feil: 401 Unauthorized
// if (!passwordMatches) {
//     res.status(401).send('Wrong password');
//     return;
// }
//
// // 4. hvis rett: lag token
// const payload = {
//     username: user.username,
// };
//
// const token = jwtSimple.encode(payload, jwtSecret);
// res.status(201).send(token);
// });
//
// app.get('/me', (req, res) => {
//     const token = req.header('Authorization');
// if (!token) {
//     res.status(401).send('Include a token plz');
//     return;
// }
//
// const payload = jwtSimple.decode(token, jwtSecret);
//
// const username = payload.username;
// const user = users.find(u => u.username === username);
// res.send(user);
// });

// app.listen(1234, () => console.log('listening on http://localhost:1234/'))







app.listen(port, () => console.log('Listening on port ' + port));

