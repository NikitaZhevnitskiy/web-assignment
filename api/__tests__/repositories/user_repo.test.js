process.env.NODE_ENV = 'test';
// const server = require('../../server');

// const express = require('express');
// const request = require('supertest');
// const api = require('../../server');
// const app = express();
// const async = require('async');  // < ========= AMAZING LIBRARY https://github.com/caolan/async
// app.use(api);

const userRepository = require('../../repositories/user_repo');

afterEach(() => {
    userRepository.cleanTable(function (cleaned) {
        expect(cleaned).toEqual("cleaned");
    });
});

beforeEach(() => {
    userRepository.cleanTable(function (cleaned) {
        expect(cleaned).toEqual("cleaned");
    });
});



it('Testing environment setup correct', (done) => {
    expect(process.env.NODE_ENV).toEqual("test");
    done();
});


test('Register new user', (done)=>{
    userRepository.registerUser('1@1.com', 'hashedPassword', function (err,user) {
        expect(user._id).not.toBeNull();
        expect(user.email).toEqual("1@1.com");
        expect(user.password).toEqual("hashedPassword");
        expect(user.todolist.length).toBe(0);
        done()
    });
});


test('Get user by email', async (done)=>{
     var callBack = () => {
         userRepository.getUserByEmail('1@1.com', (err, user) => {
             expect(user.password).toEqual("hashedPassword");
             done()
         });
     };
     await userRepository.registerUser('1@1.com', 'hashedPassword', callBack);
});

test('Get all users', (done)=>{
    var callBack = () => {
        userRepository.getAll({},(err,users)=>{
            // console.log(users)
            expect(users.length).toBe(1);
            done()
        });
    };

    userRepository.registerUser('2@2.com', 'hashedPassword', callBack);
});

test('Try to register user with existing email', (done)=>{

    var callBack = () => {
        userRepository.registerUser('1@1.com', 'hashedPassword', ()=>{
            userRepository.getAll({},(err,users)=>{
                // console.log(users)
                expect(users.length).toBe(1);
                done()
            });
        });
    };
    userRepository.registerUser('1@1.com', 'hashedPassword', callBack)
});
