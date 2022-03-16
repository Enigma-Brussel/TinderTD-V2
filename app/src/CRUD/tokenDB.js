const {
  Token
} = require('./token.js');

const {
  DatabaseFactory
} = require('./databaseFactory.js');

class TokenDB {

  randomToken(){
    let value = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    return value;
  }


  getVerbinding() {
    let databaseFactory = new DatabaseFactory();
    return databaseFactory.getDatabase();
  } 

  createToken(token){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("INSERT INTO token (token, active) VALUE (?, ?)", [token, 1]).then((value) => {
        this.getVerbinding().voerSqlQueryUit("SELECT * FROM token WHERE token = ?", [token]).then((token) => {
          console.log('TOKENDB', token);
          let TOKEN = this.converteerQueryNaarObject(token);
          resolve(TOKEN.token);
        }).catch((error) => reject(error));
      }).catch((error) => reject(error));
    });
  }

  validateToken(token){
    return new Promise((resolve, reject) => {

      console.log('CHEKEDMJLODBSILDOKJSFIOL');

      this.getVerbinding().voerSqlQueryUit("SELECT * FROM token WHERE token = ? AND active = ?", [token, 1]).then((resultaat) => {

        console.log('VALUE', resultaat);

        if((Array.isArray(resultaat) && resultaat.length == 0)){
          resolve(false);
        }else{
          this.getVerbinding().voerSqlQueryUit("UPDATE token SET active = 0 WHERE token = ?", [token]).then((value) => {
            resolve(true);
          }).catch((error) => reject(error));
        }

      }).catch((error) => reject(error));

    });
  }

  converteerQueryNaarObject(query) {
    return new Token(query.id, query.token, query.active);
  }

}

exports.TokenDB = TokenDB;