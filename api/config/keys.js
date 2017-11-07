// keys.js - figure out what env to use
switch (process.env.NODE_ENV){
    case 'production':{
        module.exports = require('./environments/prod');
        break
    }
    case 'mlabdb':{
        module.exports = require('./environments/mlab');
        break
    }
    case 'docker':{
        module.exports = require('./environments/docker');
        break
    }
    case 'test':{
        module.exports = require('./environments/testing');
        break
    }
    default: {
        process.env.NODE_ENV = 'default local environment';
        module.exports = require('./environments/local')
    }
}
