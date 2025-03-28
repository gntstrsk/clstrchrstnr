"use strict";

require('dotenv').config();

var path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const routes = require('./routes');
//const morgan = require('morgan');

// Set Config Directory (Generalizing for Builds)
  const configDirectory = path.resolve(process.cwd());

app.set("views", path.join(configDirectory, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(configDirectory, "views/css")));
//app.use(express.static(__dirname + "views/css"));
//app.use(express.static('views/css'));

//app.use(morgan(process.env.ENV));
app.use(express.json());

app.use('/', routes);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
        	message: err.message
        }
    });
});

module.exports = app;

if (process.env.ENV == 'dev' || process.env.ENV == 'prod') {
    const server = http.createServer(app);
    server.listen(process.env.PORT);
}
