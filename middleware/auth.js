const cookieParser = require('../services/cookieParser');
const userController = require('../controllers/userController');

module.exports = async (req, res, next) => {
  try {

    const cookieValue = cookieParser.getUserCookie(req);

    if(req.session.loggedin && req.session.user && cookieValue){

      console.log('SESSION', req.session);

      if(cookieValue == req.session.user.id){
        userController.getUser(cookieValue).then((user) => {
          if(user){
            next();
          }else{
            cookieParser.deleteUserCookie();
            res.redirect("/login");
          }
        }).catch((error) => {
          console.log('error', error);
          cookieParser.deleteUserCookie();
          res.redirect("/login");
        });
      }else{
        cookieParser.deleteUserCookie();
        res.redirect("/login");
      }

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