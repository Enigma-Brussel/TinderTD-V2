const {
    User
} = require('./user.js');

const {
    DatabaseFactory
} = require('./databaseFactory.js');

const bcrypt = require('bcrypt');

const saltRounds = 10;


class UserDB {

    getVerbinding() {
        let databaseFactory = new DatabaseFactory();
        return databaseFactory.getDatabase();
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("SELECT * FROM user").then((resultaat) => {
                let resultatenArray = [];
                if(!Array.isArray(resultaat)){
                    resultatenArray.push(this.converteerQueryNaarObject(resultaat))
                }else{
                    resultaat.map((value) => {
                        resultatenArray.push(this.converteerQueryNaarObject(value));
                    });
                }

                
                resolve(resultatenArray);
            }).catch((error) => reject(error));
        });
    }

    getUserFromEmail(email) {
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("SELECT * FROM user WHERE email = ?", [email]).then((resultaat) => {
                resultaat = this.converteerQueryNaarObject(resultaat)
                resolve(resultaat);
            }).catch((error) => reject(error));
        });
    }

    getUserFromUserID(userID) {
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("SELECT * FROM user WHERE id = ?", [userID]).then((value) => {
                let resultaat = this.converteerQueryNaarObject(value);
                resolve(resultaat);
            }).catch((error) => reject(error));
        });
    }


    /**
     * Controleer als de wachtwoord juist is adhv email
     * @param {string} email 
     * @param {string} password 
     * @returns false als wachtwoord verkeerd is, anders het User object
     */
    checkPassword(email, password) {
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("SELECT * FROM user WHERE email = ?", [email]).then((resultaat) => {
                if(resultaat.length !== 0){
                    bcrypt.compare(password, resultaat.password).then((result) => {
                        if (result) {
                            resolve(this.converteerQueryNaarObject(resultaat));
                        } else {
                            resolve(false);
                        }
                    });
                }else{
                    resolve(false);
                }
            }).catch((error) => reject(error));
        });
    }

    /**
     * Sla een user op in de database
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     * @param {string} picture 
     * @param {*} active 
     * @param {number} superlikes 
     * @returns User object van nieuwe gemaakte user
     */
    createUser(email, password, name, picture, active, superlikes, age, job, association, bio) {
        return new Promise((resolve, reject) => {
            this.hashPass(password).then(hashedPassword => {
                this.getVerbinding().voerSqlQueryUit("INSERT INTO user (email, password, name, picture, active, superlikes, age, job, association, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [email, hashedPassword, name, picture, active, superlikes, age, job, association, bio]).then(() => {
                    this.getUserFromEmail(email).then((value) => {
                        resolve(value);
                    }).catch((error) => reject(error));
                }).catch((error) => reject(error));
            }).catch((error) => reject(error));
        });
    }

    /**
     * Verander de profielfoto url
     * @param {number} id 
     * @param {string} picture 
     * @returns true indien succes
     */
    changeProfilePicture(id, picture){
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("UPDATE user SET picture = ? WHERE id = ?", [picture, id]).then(() => {
                resolve(true);
            }).catch((error) => reject(error));
        });
    }

    /**
     * Verander profiel gegevens (behalve wachtwoord en profielfoto)
     * @param {number} id 
     * @param {string} email 
     * @param {string} name 
     * @param {*} active 
     * @param {number} superlikes
     * @returns true indien succes
     */
    editProfile(id, email, name, active, superlikes, age, job, association, bio) {
        return new Promise((resolve, reject) => {
            this.getVerbinding().voerSqlQueryUit("UPDATE user SET email = ?, name = ?, active = ?, superlikes = ?, age = ?, job = ?, association = ?, bio = ? WHERE id = ?", [email, name, active, superlikes,age, job, association, bio, id]).then(() => {
                resolve(true);
            }).catch((error) => reject(error));
        });
    }

    /**
     * Encrypteer het passwoord
     * @param {string} password 
     * @returns Promise met geëncrypteerde passwoord
     */
    hashPass(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds).then(function(hash) {
               resolve(hash);
            }).catch((error) => reject(error));
        })
    }

    /**
     * Zet de gekregen query om in een User object
     * @param {*} query 
     * @returns User object
     */
    converteerQueryNaarObject(query) {
        return new User(query.id, query.email, query.name, query.picture, query.active, query.superlikes, query.age, query.job, query.association, query.bio);
    }
}

exports.UserDB = UserDB;