const express = require('express'); 
const user = require('./user');
const auth = require('./auth')
const pets = require('./pets')
const matches = require('./matches.js')
const favourites = require('./favourites.js')

const router = express.Router(); 

auth.installPassport(router)

router.use(pets)
router.use(user)
router.use(matches)
router.use(favourites)

module.exports = {
    router
}