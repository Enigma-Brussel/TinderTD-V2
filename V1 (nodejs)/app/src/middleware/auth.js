const userController = require('../controllers/userController');

module.exports = async (req, res, next) => {
  try {

    if(req.session.loggedin && req.session.user){

        userController.getUser(req.session.user.id).then((user) => {
          if(user){
            next();
          }else{
            res.redirect("/login");
          }
        }).catch((error) => {
          console.log('error', error);
          res.redirect("/login");
        });

    }else{
      res.redirect("/login");
    }

    

  } catch (error) {
    console.log(error);
    res.statusCode = 500;
    res.json({
      error: 'Unknown Error (AUTH)'
    });
  }
}