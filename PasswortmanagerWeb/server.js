require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const path = require('path')
const http = require('http');


const port = 3001;

const app = express();

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        sameSite: 'none'
    }
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));

//app.use('/Class', express.static(path.join(__dirname, 'Class')));


app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (req.url.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    next();
});

  /*
app.get('/Class', (req, res) => {
    const directoryPath = path.join(__dirname, 'Class');
    
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(files);
        }
    });
});
*/





app.get('*.css', function (req, res, next) {
    res.set('Content-Type', 'text/css');
    next();
});


app.get('*.js', function (req, res, next) {
    res.set('Content-Type', 'application/javascript');
    next();
});


const options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem'),
    rejectUnauthorized: false
};

/*
const server = http.createServer((req, res) => {
    
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        }
    });
});
*/

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(data);
        }
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/login.html");
});


server.listen(port, () => {
    console.log(`Server läuft auf https://localhost:${port}/login`);
});