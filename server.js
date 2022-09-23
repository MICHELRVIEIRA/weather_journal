/* Empty JavaScript object to act as application API endpoint */

const projectData = [];

// TODO-Express to run server and routes

const express = require('express');

const app = express();

// TODO-Start up an instance of app

/* Dependencies */

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

// TODO-Cors for cross origin allowance

const cors = require('cors');

app.use(cors());

/* Initializing the main project folder */

app.use(express.static('./files'));

const port = 5500;

const server = app.listen(port, listening)

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// TODO-Routes

/* Method GET */

app.get('/getData', getData);

function getData(req, res) {
    res.send(projectData);    
};

/* Method POST */

app.post('/addData', addData);

function addData(req, res) {
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content 
    };
    projectData.push(newEntry);
    res.send(projectData);
};