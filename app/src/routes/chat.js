const router = require('express').Router();
const apiRouter = require('express').Router();

const ConnectionController = require('../controllers/connectionController');

const path = require('path');


router.get('/', (req,res) => {
  let connectionID = req.query.connection;

  // check als user tot de connectie behoort
  ConnectionController.getConnection(connectionID).then((connection) => {
    if((req.session.user.id == connection.userOne || req.session.user.id == connection.userTwo) && connection.matchComplete == 1 && (connection.matchType == 'like' || matchType.matchType == 'superlike')){
      
      req.session.connectionID = connectionID;
      
      res.sendFile(path.join(`/usr/src/app/src/views/chat.html`));
    }else{
      res.sendFile(path.join(`/usr/src/app/src/views/matches.html`));
    }
  }).catch((error) => {
    console.log('GET', `/chat?connection=${connectionID}`, error);
    res.sendFile(path.join(`/usr/src/app/src/views/matches.html`));
  });
});


// api

apiRouter.post('/messages', (req, res) => {
  console.log('GET', '/api/chat/messages', req.body);

  if(req.session.connectionID){
    let connectionID = req.session.connectionID;

  }else{

  }
});

apiRouter.post('/send', (req, res) => {
  
});


module.exports = {
  chat: router,
  chatApi: apiRouter
};