const router = require('express').Router();
const multer = require('multer');

const UserController = require('../controllers/userController');


// multer

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/users")
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() + file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}

let upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

// login/register

router.post('/register', upload.single('profilepicture'), (req, res) => {
  console.log('POST', '/api/user/register', req.body);

  // foto word door middleware al upgeload -> req.file is een extra zekerheid dat het gelukt is
  if(req.file){

    UserController.register(req.body.email, req.body.password, req.body.name, req.file.filename, req.body.age, req.body.job, req.body.association, req.body.bio).then((value) => {
      if(value){

        // succes
        res.statusCode = 200;
        res.json(value);
        
      }else{
        res.statusCode = 500;
        res.json({
          error: 'Unknown Error (DB 1)'
        });
      }
    }).catch((error) => {
      res.statusCode = 500;
      res.json({
        error: `Unknown Error (DB 2): ${error}`
      });
    });

  }else{
    res.statusCode = 500;
    res.json({
      error: 'Error: no picture'
    });
  }

});

router.post('/login', (req, res) => {
  console.log('POST', '/api/user/login', req.body);
  UserController.login(req.body.email, req.body.password).then((value) => {
    if(value){
      req.session.user = value;
      req.session.loggedin = true;
    }
    res.statusCode = 200;
    res.json(value); // value is false bij onjuist wachtwoord | bij goed antwoord het User object
  }).catch((value) => {
    res.statusCode = 500;
    res.json({
      error: 'Unknown Error'
    });
  });
});

router.get('/logout', (req, res) => {
  console.log('GET', '/api/user/logout', req.body);
  req.session.loggedin = false;
  req.session.user = null;
  res.status(200);
  res.redirect('/login');
});

module.exports = router;