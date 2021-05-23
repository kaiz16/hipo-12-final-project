const express = require('express'); 
const user = require('./User');
const auth = require('./auth')
const pets = require('./pets')


const router = express.Router(); 

auth.installPassport(router)

router.use(pets)
router.use(user)

module.exports = {
    router
}