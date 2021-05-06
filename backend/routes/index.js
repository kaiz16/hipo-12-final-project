const express = require('express'); 
const auth = require('./auth')


const router = express.Router(); 

auth.installPassport(router)


module.exports = {
    router
}