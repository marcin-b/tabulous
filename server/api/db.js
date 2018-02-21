// Bluebird is the best promise library available today,
// and is the one recommended here:
import * as promise from 'bluebird';

// Get db data
import * as secrets from "../../secrets"


// pg-promise initialization options:
const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
};

// initialize pg-promise
const pgp = require('pg-promise')(initOptions);

// initialize db
const db = pgp(`postgres://${secrets.dbUser}:${secrets.dbPass}@localhost:5432/tabdb`);

export default db
