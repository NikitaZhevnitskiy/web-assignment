// set test env
process.env.NODE_ENV = 'test';
const express = require('express');
const request = require('supertest');
const app = express();
const api = require('../../server');
const async = require('async');
app.use(api);

/************************** CLEAN DATABASE **************************** */
const userRepository = require('../../repositories/user_repo');
afterEach(() => {
    userRepository.cleanTable((cleaned)=>{
        expect(cleaned).toEqual("cleaned");
    });
});
beforeEach(() => {
    userRepository.cleanTable((cleaned)=>{
        expect(cleaned).toEqual("cleaned");
    });
});
/********************************************************************** */

const credentials = {
    "email":"a@a.com",
    "password":"123123"
};

const item = {
    "title":"super item",
    "description":"and long description"
};

const getToken = function(mainCb) {
    const agent = request(app);
    async.series([
        function(cb) {
            agent
                .post('/users')
                .send(credentials)
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('Accept', 'application/json; charset=utf-8').expect(201, cb);
        },
        function(cb) {
            agent.post('/login')
                .send(credentials)
                .set('Content-Type', 'application/json; charset=utf-8')
                .set('Accept', 'application/json; charset=utf-8')
                .expect(200).end((err,res)=>{
                expect(res.body.token).not.toBeNull();
                mainCb(res.body.token);
                cb()
            })
        }
    ]);
};

test('GET /list - With token | get all items in list', (done) => {
    getToken((token)=>{
        return request(app)
            .get('/users/list')
            .set('Authorization',token)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json; charset=utf-8')
            .end((err,res) => {
                // list empty
                expect(200).toBe(res.statusCode);
                expect(0).toBe(res.body.todolist.length);
                done()
            });
    });
});

test('PUT /list - With token | create new item', (done) => {
    getToken((token)=>{
        return request(app)
            .put('/users/list')
            .set('Authorization',token)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json; charset=utf-8')
            .send(item)
            .end((err,res) => {
                // console.log(res.body);
                expect(201).toBe(res.statusCode);
                expect("super item").toBe(res.body.todolist[0].title);
                // list empty -> return nothing
                done()
            });
    });
});

test('DELETE /list/:id - With token | success', (done) => {
    getToken((token)=>{
        return request(app)
            .put('/users/list')
            .set('Authorization',token)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json; charset=utf-8')
            .send(item)
            .end((err,res) => {
                // console.log(res.body);
                expect(201).toBe(res.statusCode);
                const itemId = res.body.todolist[0]._id;
                request(app)
                    .delete(`/users/list/${itemId}`)
                    .set('Authorization',token)
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .set('Accept', 'application/json; charset=utf-8')
                    .end((err,res)=>{
                        console.log(res.statusCode);
                        console.log(res.body);
                        expect(200).toBe(res.statusCode)
                        expect(1).toBe(res.body.n);
                        expect(1).toBe(res.body.nModified);
                        expect(1).toBe(res.body.ok);
                        done()
                    });

            });
    });
});


test('DELETE /list/:id - Valid token, Non-existing item id', (done) => {
    const nonExist = '5a0f5627dd30421a55bf0a11';
    getToken((token)=>{
        return request(app)
            .put('/users/list')
            .set('Authorization',token)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json; charset=utf-8')
            .send(item)
            .end((err,res) => {
                // console.log(res.body);
                expect(201).toBe(res.statusCode);
                request(app)
                    .delete(`/users/list/${nonExist}`)
                    .set('Authorization',token)
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .set('Accept', 'application/json; charset=utf-8')
                    .end((err,res)=>{
                        // console.log(res.statusCode);
                        // console.log(res.body);
                        expect(200).toBe(res.statusCode);
                        expect(1).toBe(res.body.n);
                        expect(0).toBe(res.body.nModified);
                        expect(1).toBe(res.body.ok);
                        done()
                    });

            });
    });
});

test('DELETE /list/:id - Valid token, Invalid item id', (done) => {
    const nonValid = 'dasdasdad';
    getToken((token)=>{
        return request(app)
            .put('/users/list')
            .set('Authorization',token)
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Accept', 'application/json; charset=utf-8')
            .send(item)
            .end((err,res) => {
                // console.log(res.body);
                expect(201).toBe(res.statusCode);
                request(app)
                    .delete(`/users/list/${nonValid}`)
                    .set('Authorization',token)
                    .set('Content-Type', 'application/json; charset=utf-8')
                    .set('Accept', 'application/json; charset=utf-8')
                    .end((err,res)=>{
                        // actually fail repository -> TODO: fix later
                        expect(500).toBe(res.statusCode);
                        done()
                    });

            });
    });
});











