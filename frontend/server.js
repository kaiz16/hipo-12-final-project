const express = require('express');

const connectHistoryApiFallback = require('connect-history-api-fallback')
// server static library
// this will serve static files
const serveStatic = require("serve-static")
// 
const path = require('path');

// init express
const app = express();

app.use(connectHistoryApiFallback())
// get the folder path

const folderPath = path.join(__dirname, 'dist')

// index.html
const rootFile = serveStatic(folderPath)

app.use(rootFile);

const port = process.env.PORT || 8080;
app.listen(port);