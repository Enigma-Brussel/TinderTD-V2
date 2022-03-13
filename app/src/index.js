const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

// declarations
const app = express()
const port = process.env.PORT;


// static files
app.use(express.static(`${__dirname}/public`));


// middleware
// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(session({
	secret: process.env.SESSIONSECRET,
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const auth = require('./middleware/auth');

// database


// Views
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/login.html`));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/register.html`));
});


app.get('/user', auth, (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/user.html`));
});

app.get('/main', auth, (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/main.html`));
});

app.get('/matches', auth, (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/matches.html`));
});

app.get('/chat', auth, (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/chat.html`));
});

// API

const userRoute = require('./routes/user.js');
app.use('/api/user', userRoute);

const connectionRoute = require('./routes/connection.js');
app.use('/api/connection', connectionRoute);



// server
app.listen(port, () => {
  console.log(`Tinder server started at port ${port}`);
});