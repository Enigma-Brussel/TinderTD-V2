const cookie = require('cookie');

const cookieName = 'tinderTD';

class cookieParser {
  
  static createUserCookie(res, value){
    console.log('setting up cookie');
    let setCookie = cookie.serialize(cookieName, value, {
      path: '*',
      secure: true
    });
    res.setHeader('Set-Cookie', setCookie);
  }

  static deleteUserCookie(){
    
  }

  static getUserCookie(req){
    // return de cookie value
    let cookieData = cookie.parse(req.headers.cookie || '');
    let userID = cookieData[cookieName];

    if(userID){
      return userID;
    }else{
      return false;
    }


    // return true; // voorlopig om auth te bypassen

  }

}

module.exports = cookieParser;