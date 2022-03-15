const router = require('express').Router();
const path = require('path');

const auth = require('../middleware/auth');
const ConnectionController = require('../controllers/connectionController');
const { Router } = require('express');

/**
 * Krijg alle matches
 */
router.get('/allmatches', (req, res) => {
  console.log('GET', '/api/connection/allmatches', req.body);

  let userId = req.session.user.id;

  ConnectionController.getCompletedMatches(userId).then((matches) => {
    res.status(200);
    res.json(matches);
  }).catch((error) => {
    console.log('ERROR', error);
    res.status(500);
    res.json({error: 'Er is iets misgelopen: Contacteer Miguel'});
  });

});

/**
 * like/dislike/superlike een persoon
 */
router.post('/match', (req, res) => {
  console.log('POST', '/api/connection/match', req.body);

  let userId = req.session.user.id;

  if(req.body.targetUser && req.body.connectionType){

    ConnectionController.makeConnection(userId, req.body.targetUser, req.body.connectionType).then((value) => {
      res.status(200);
      res.json(value);
    }).catch((value) => {
      console.log('ERROR', value);
      res.status(500);
      res.json({error: 'Er is iets misgelopen: Contacteer Miguel'});
    });

  }else{
    console.log('ERROR', 'Missing data');
    res.status(500);
    res.json({error: 'Er is iets misgelopen: Contacteer Miguel (Missing data)'});
  }

  

});

/**
 * Krijg potentiele matches
 */
router.get('/potentional', (req, res) => {
  console.log('GET', '/api/connection/potentional', req.body);

  let userId = req.session.user.id;

  ConnectionController.getPotentionalMatches(userId).then((potentionalMatches) => {

    res.status(200);
    res.json(potentionalMatches);

  }).catch((value) => {
    console.log('ERROR', value);
    res.status(500);
    res.json({error: 'Er is iets misgelopen: Contacteer Miguel'});
  });

});

module.exports = router;