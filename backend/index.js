const express = require('express');
require('dotenv').config()

const app = express()

app.listen(process.env.PORT, ()=> {
    console.log('App is now listening on Port' + process.env.PORT)
})