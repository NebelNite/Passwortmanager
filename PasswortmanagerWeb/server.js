
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const https = require('https');
const fs = require('fs');
const path = require('path')
const http = require('http');
const cors = require('cors');
const axios = require('axios');

const port = 3001;

const app = express();

app.use(cors());


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


app.use('/JS', express.static(path.join(__dirname, 'JS')));
app.use('/CSS', express.static(path.join(__dirname, 'CSS')));
app.use('/Class', express.static(path.join(__dirname, 'Class')));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/HTML/login.html");
  });

app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    } else if (req.url.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    next();
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
  
app.get('/homepage', (req, res) => {
    res.sendFile(__dirname + "/HTML/homepage.html");
});

app.get('/passwordGenerator', (req, res) => {
    res.sendFile(__dirname + "/HTML/passwordGenerator.html");
});

app.get('/passwordInput', (req, res) => {
    res.sendFile(__dirname + "/HTML/passwordInput.html");
});


app.get('/Images/leftBack.png', (req, res) => {
    res.sendFile(__dirname + '/Images/leftBack.png');
});


app.post('/postToServer',async (req, res) => {
    
    const obj = req.body;

    const data = obj.data;
    const url = obj.url;

    await axios.post(url, data)
    .then(response => {
        console.log("Server:Response: "+ response.data);
        res.json({ message: response.data });
    })
    .catch(error => {
        console.log("Error");
        console.error(error);
    });
    

});


app.post('/getToServer',async (req, res) => {
    
    const springUrl = req.body.url;
    
    await axios.get(springUrl, {})
    .then(response => {
      console.log("Server:Response: " + response);
      res.json({ message: response.data });
    })
    .catch(error => {
      console.log("Error");
      console.error(error);
    });
  });





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


app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/HTML/login.html");
});


https.createServer(options, app).listen(port, () => {
    console.log(`Server läuft auf https://localhost:${port}/login`);
});