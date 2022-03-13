const { promise, reject } = require('bcrypt/promises');
const { ConnectionDB } = require('../CRUD/connectionDB.js');
const { User } = require('../CRUD/user.js');
const UserController = require('./userController.js');

let connectionDB = new ConnectionDB;

class connectionController {

  /**
   * Process de match
   * @param {number} userOne 
   * @param {number} userTwo 
   * @param {string} matchType 
   * @returns status van de match
   */
  static makeConnection(userOne, userTwo, matchType){
    return new Promise((resolve, reject) => {
      
      // check als er al een connectie is tussen de 2
      connectionDB.getConnectionByUsers(userOne, userTwo).then((connection) => {
        if(connection){
          // er is een connectie

            // check als de match nog open is
            if(connection.matchComplete){
              // match is al compleet
              reject({error: "Match is al compleet"})
            }else{

              // check dat user zijn eigen connectie niet kan bevestigen.
              if(connection.userOne != userOne){

                switch(matchType){
                  case 'like':
                    if(connection.matchType == 'like' || connection.matchType == 'superlike'){
                      // MATCH (like)
                      connectionDB.editConnection(connection.id, 'like', true).then((value) => {
                        resolve({status: 'match', type: 'like', complete: true});
                      }).catch((error) => reject(error));
                    }else{
                      // dislike match
                      connectionDB.editConnection(connection.id, 'dislike', true).then((value) => {
                        resolve({status: 'nomatch', type: 'dislike', complete: true});
                      }).catch((error) => reject(error));
                    }
                    break;
                  case 'dislike':
                    // dislike match
                    connectionDB.editConnection(connection.id, 'dislike', true).then((value) => {
                      resolve({status: 'nomatch', type: 'dislike', complete: true});
                    }).catch((error) => reject(error));
                    break;
                  case 'superlike':

                    // check als gebruiker een superlike heeft

                    UserController.removeSuperLike(userOne).then((value) => {

                      if(connection.matchType == 'superlike'){
                        // MATCH (superlike)
                        connectionDB.editConnection(connection.id, 'superlike', true).then((value) => {
                          resolve({status: 'match', type: 'superlike', complete: true});
                        }).catch((error) => reject(error));
                        // bonus?
                      }else if(connection.matchType == 'like'){
                        // MATCH (like)
                        connectionDB.editConnection(connection.id, 'like', true).then((value) => {
                          resolve({status: 'match', type: 'like', complete: true});
                        }).catch((error) => reject(error));
                      }else{
                        // dislike match
                        connectionDB.editConnection(connection.id, 'dislike', true).then((value) => {
                          resolve({status: 'nomatch', type: 'dislike', complete: true});
                        }).catch((error) => reject(error));
                      }

                    }).catch((error) => reject(error));

                    break;
                  default:
                    reject({error: `Onbekende match type: ${matchType}`});
                    break;
                }

              }else{
                // user bevestigd eigen connectie -> error
                reject({error: "Kan niet eigen connectie bevestigen"})
              }

            }

        }else{
          // nieuwe connectie maken

          if(matchType == 'superlike'){

            UserController.removeSuperLike(userOne).then((value) => {

              connectionDB.createConnection(userOne, userTwo, matchType, false).then((value) => {
                resolve({status: 'nomatch', type: matchType, complete: false});
              }).catch((error) => reject(error));

            }).catch((error) => reject(error));

          }else{

            connectionDB.createConnection(userOne, userTwo, matchType, false).then((value) => {
              resolve({status: 'nomatch', type: matchType, complete: false});
            }).catch((error) => reject(error));

          }
          
        }
      });

    });
  }

  /**
   * Krijg alle matches
   * @param {number} id ingelogde userID
   * @returns Array met matches (+ gebruiker gegevens in de match object verwerkt)
   */
  static getCompletedConnections(id){

    let targetUser = 0;

    let targetUserArray = [];
    let matchesArray = [];

    let promiseStack = [];

    return new Promise((resolve, reject) => {
      connectionDB.getAllCompletedConnectionsByUserID(id).then(async (matches) => {

        await matches.map((match) => {
          if(match.userOne == id){
            targetUser = match.userTwo;
          }else{
            targetUser = match.userOne;
          }
          promiseStack.push(UserController.getUser(targetUser));
        });

        await Promise.all(promiseStack).then((users) => {
          users.map((user) => {
            targetUserArray.push(user);
          });
        }).catch((error) => reject(error));

        // converteer connections om personlijke data te verwijderen

        matches.map((match, index) => {
          matchesArray.push({
            id: match.id,
            user: {
              id: targetUserArray[index].id,
              name: targetUserArray[index].name,
              picture: targetUserArray[index].picture
            },
            matchType: match.matchType,
            matchComplete: match.matchComplete
          });
        });

        await resolve(matchesArray);
      }).catch((error) => reject(error));
    });
  }

  /**
   * Krijg potentieele matches
   * @param {number} id ingelogde userID 
   * @returns Array met potentieële matches
   */
  static getPotentionalMatches(id){

    let potentionalUsersArray = [];

    return new Promise((resolve, reject) => {
      
      // 1. Alle gebruikers ophalen
      UserController.getAllUsers().then((users) => {

        // 2. gebruikers met connectionComplete uithalen
        this.getCompletedConnections(id).then(async (completedConnections) => {

          await completedConnections.map((completedConnection) => {
            let removeIndex = users.map((user) => {
              return user.id;
            }).indexOf(completedConnection.user.id);
            if(removeIndex !== -1) users.splice(removeIndex, 1);
          });

          // 3. gebruikers met connectie aangemaakt door gebruiker uithalen
          connectionDB.getAllMadedConnectionsByUserID(id).then(async (madedConnections) => {

            await madedConnections.map((madedConnection) => {
              let removeIndex = users.map((user) => {
                return user.id;
              }).indexOf(madedConnection.userTwo);
              if(removeIndex !== -1) users.splice(removeIndex, 1);
            });

            // 4. eigen gebruiker uithalen
            let removeIndex = users.map((user) => {
              return user.id;
            }).indexOf(id);
            if(removeIndex !== -1) users.splice(removeIndex, 1);

            // converteer users om personlijke data te verwijderen
            users.map((user) => {
              potentionalUsersArray.push({
                id: user.id,
                name: user.name,
                picture: user.picture,
                age: user.age,
                job: user.job,
                association: user.association,
                bio: user.bio
              });
            });

            resolve(potentionalUsersArray);

          }).catch((error) => reject(error));
        }).catch((error) => reject(error));
      }).catch((error) => reject(error));

    });

  }

}

module.exports = connectionController;