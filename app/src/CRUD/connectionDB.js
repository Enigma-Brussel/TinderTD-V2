const {
  Connection
} = require('./connection.js');

const {
  DatabaseFactory
} = require('./databaseFactory.js');


class ConnectionDB {

  getVerbinding() {
    let databaseFactory = new DatabaseFactory();
    return databaseFactory.getDatabase();
  }

  /**
   * Krijg alle complete connections van de gebruiker
   * @param {number} id Gebruiker id
   */
  getAllCompletedConnectionsByUserID(id){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("SELECT * FROM connection WHERE (user_one = ? OR user_two = ?) AND match_complete = 1", [id, id]).then((matches) => {
        let matchesArray = [];
        if(!Array.isArray(matches)){
          matchesArray.push(this.converteerQueryNaarObject(matches));
        }else{
          matches.map((match) => {
            matchesArray.push(this.converteerQueryNaarObject(match));
          });
        }
        resolve(matchesArray);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Krijg alle complete matches van de gebruiker
   * @param {number} id Gebruiker id
   */
  getAllCompletedMatchesByUserID(id){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("SELECT * FROM connection WHERE (user_one = ? OR user_two = ?) AND (match_type = 'like' OR match_type = 'superlike')  AND match_complete = 1", [id, id]).then((matches) => {
        let matchesArray = [];
        if(!Array.isArray(matches)){
          matchesArray.push(this.converteerQueryNaarObject(matches));
        }else{
          matches.map((match) => {
            matchesArray.push(this.converteerQueryNaarObject(match));
          });
        }
        resolve(matchesArray);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Krijg alle connecties gemaakt door de gebruiker
   * @param {number} id 
   * @returns {Promise} Array van connectie objecten
   */
   getAllMadedConnectionsByUserID(id){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("SELECT * FROM connection WHERE user_one = ?", [id]).then((matches) => {
        let matchesArray = [];
        if(!Array.isArray(matches)){
          matchesArray.push(this.converteerQueryNaarObject(matches));
        }else{
          matches.map((match) => {
            matchesArray.push(this.converteerQueryNaarObject(match));
          });
        }
        resolve(matchesArray);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Krijg de connectie object tussen 2 gebruikers
   * @param {number} userOne Gebruiker 1
   * @param {number} userTwo Gebruiker 2
   * @returns Connectie object
   */
  getConnectionByUsers(userOne, userTwo){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("SELECT * FROM connection WHERE (user_one = ? AND user_two = ?) OR (user_one = ? AND user_two = ?) LIMIT 1", [userOne, userTwo, userTwo, userOne]).then((value) => {
        if(value.length != 0){
          resolve(this.converteerQueryNaarObject(value));
        }else{
          resolve(false);
        }
      }).catch((error) => reject(error));
    });
  }
  
  /**
   * Maak een nieuwe connectie
   * @param {number} userOne Gebruiker 1
   * @param {number} userTwo Gebruiker 2
   * @param {string} matchType like | dislike | superlike
   * @param {boolean} matchComplete true als de match compleet is
   * @returns /
   */
  createConnection(userOne, userTwo, matchType, matchComplete = false){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("INSERT INTO connection (user_one, user_two, match_type, match_complete) VALUE (?, ?, ?, ?)", [userOne, userTwo, matchType, matchComplete]).then((value) => {
        resolve(value);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Verander de connectie / compleet de connectie
   * @param {number} id Connectie id
   * @param {string} matchType like | dislike | superlike
   * @param {boolean} matchComplete true als de match compleet is
   */
  editConnection(id, matchType, matchComplete){
    return new Promise((resolve, reject) => {
      this.getVerbinding().voerSqlQueryUit("UPDATE connection SET match_type = ?, match_complete = ? WHERE id = ?", [matchType, matchComplete, id]).then((value) => {
        resolve(value);
      }).catch((error) => reject(error));
    });
  }

  /**
     * Zet de gekregen query om in een Connection object
     * @param {*} query 
     * @returns Connection object
     */
  converteerQueryNaarObject(query) {
    return new Connection(query.id, query.user_one, query.user_two, query.match_type, query.match_complete);
  }

}

exports.ConnectionDB = ConnectionDB;