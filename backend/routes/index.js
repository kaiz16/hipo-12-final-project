const express = require('express'); 
const user = require('./user');
const pets = require('./pets')
const matches = require('./matches.js')
const favourites = require('./favourites.js')
const personalities = require('./personalities.js')
const types = require('./types.js')

const router = express.Router(); 


router.use(pets)
router.use(user)
router.use(matches)
router.use(favourites)
router.use(personalities)
router.use(types)

module.exports = {
    router
}