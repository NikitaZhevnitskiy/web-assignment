// keys.js - figure out what env to use
switch (process.env.NODE_ENV){
    case 'production':{
        module.exports = require('./prod')
        break
    }
    case 'development':{
        module.exports = require('./dev')
        break
    }
    default: {
        module.exports = require('./local')
    }
}
