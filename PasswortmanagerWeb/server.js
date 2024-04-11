require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const path = require('path')


const port = 3001;

const app = express();

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));




/*
app.get('*.css', function (req, res, next) {
    res.set('Content-Type', 'text/css');
    next();
});

app.get('*.js', function (req, res, next) {
    res.set('Content-Type', 'application/javascript');
    next();
});
*/

const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem'),
    rejectUnauthorized: false
};

const server = https.createServer(options, app);

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/html/login.html");
});

server.listen(port, () => {
    console.log(`Server läuft auf https://localhost:${port}/login`);
});