const {
    Database
} = require('./database.js');

class DatabaseFactory {

    constructor() {
        this.verbinding = null;
    }

    getDatabase() {
        if (this.verbinding == null) {
            this.verbinding = new Database(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.DATABASE);
        }
        return this.verbinding;
    }

}

exports.DatabaseFactory = DatabaseFactory;