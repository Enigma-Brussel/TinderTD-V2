const { reject, use } = require('bcrypt/promises');
const { UserDB } = require('../CRUD/userDB.js');

let userDB = new UserDB;

class UserController {
  
  static register(email, password, name, picture, age, job, association, bio) {
    return new Promise((resolve, reject) => {

      // check als de email al in gebruik is
      this.getUserByEmail(email).then((user) => {
        if(user){
          reject('Email al in gebruik');
        }else{
          userDB.createUser(email, password, name, picture, 0, 1, age, job, association, bio).then(value => {
            resolve(value);
          }).catch(value => {
            console.log('UserController', value);
            reject(value);
          });
        }
      }).catch((error) => reject(error));
    });
  }

  static login(email, password){
    return new Promise((resolve, reject) => {
      userDB.checkPassword(email, password).then(value => {
        resolve(value);
      }).catch(value => {
        reject(value);
      });
    });
  }

  static editProfile(id, value){
    return new Promise((resolve, reject) => {
      this.getUser(id).then((user) => {
        if(user){

          let input = {
            email: value['email'] ?? user.email,
            name: value['name'] ?? user.name,
            active: value['active'] ?? user.active,
            superlikes: value['superlikes'] ?? user.superlikes,

            age: value['age'] ?? user.age,
            job: value['job'] ?? user.job,
            association: value['association'] ?? user.association,
            bio: value['bio'] ?? user.bio
          }

          userDB.editProfile(id, input.email, input.name, input.active, input.superlikes, input.age, input.job, input.association, input.bio).then((value) => {
            resolve(value);
          }).catch((error) => reject(error));

        }else{
          reject({error: "Profiel niet gevonden"})
        }
      }).catch((error) => reject(error));
    });
  }

  static editProfilePicture(id, picture){
    return new Promise((resolve, reject) => {
      userDB.changeProfilePicture(id, picture).then(value => {
        resolve(value);
      }).catch(value => {
        reject(value);
      });
    });
  }

  static removeSuperLike(id){
    return new Promise((resolve, reject) => {
      this.getUser(id).then((user) => {
        if(user.superlikes < 1){
          reject({error: "Niet genoeg super likes"});
        }else{
          this.editProfile(id, {superlikes: user.superlikes - 1}).then((value) => {
            resolve(value);
          }).catch((error) => reject(error));
        }
      });
    });
  }

  static getUser(id){
    return new Promise((resolve, reject) => {
      userDB.getUserFromUserID(id).then((user) => {
        resolve(user);
      });
    });
  }

  static getUserByEmail(email){
    return new Promise((resolve, reject) => {
      userDB.getUserFromEmail(email).then((user) => {
        resolve(user);
      }).catch((error) => reject(error));
    });
  }

  static getAllUsers(){
    return new Promise((resolve, reject) => {
      userDB.getAll().then((users) => {
        resolve(users);
      }).catch((error) => reject(error));
    });
  }

}

module.exports = UserController;