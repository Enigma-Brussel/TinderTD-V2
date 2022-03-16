const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const http = require('http');
const SocketManager = require('./socketManager');


require('dotenv').config();

// declarations
const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);

global.socketManager = new SocketManager(io);

function isloggedin(req){
  req.session.user && req.session.isloggedin == true ? true : false;
}


// static files
app.use(express.static(`${__dirname}/public`));


// middleware
// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "%");
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


// chat



const {chat, chatApi} = require('./routes/chat.js');

// Views

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});


app.get('/login', (req, res) => {
  isloggedin(req) ? res.redirect("/main") : res.sendFile(path.join(`${__dirname}/views/login.html`));
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

app.get('/check', auth, (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/check.html`));
});

app.use('/chat', auth, chat);

// API

const userRoute = require('./routes/user.js');
app.use('/api/user', userRoute);

const connectionRoute = require('./routes/connection.js');
app.use('/api/connection', connectionRoute);

const tokenRoute = require('./routes/token.js');
app.use('/api/token', tokenRoute);

app.use('/api/chat', chatApi);


// server

server.listen(port, () => {
  console.log(`Tinder server started at port ${port}`);
});