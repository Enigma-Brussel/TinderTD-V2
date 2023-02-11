const router = require('express').Router();

const { TokenDB } = require('../CRUD/tokenDB');

const tokenDB = new TokenDB;

router.post('/', (req, res) => {
  console.log('POSTR', '/api/token', req.body);

  if(req.body.tokenValue){
    tokenDB.validateToken(req.body.tokenValue).then((value) => {
      res.json({valid: true});
    }).catch((error) => {
      console.log('ERROR', error);
      res.json({error: error});
    });
  }else{
    res.json({valid: false});
  }
});

module.exports = router;