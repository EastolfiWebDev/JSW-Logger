/* global _ */

class BaseLogger {
    constructor() {
        // Fallback functions
        if (!console.debug) {
            console.debug = console.log;
        }
        if (!console.info) {
            console.info = console.log;
        }
    }
    
    silly(msg) {
        console.log(msg);
    }
    input(msg) {
        console.log(msg);
    }
    log(msg) {
        console.log(msg);
    }
    verbose(msg) {
        console.debug(msg);
    }
    prompt(msg) {
        console.debug(msg);
    }
    debug(msg) {
        console.debug(msg);
    }
    info(msg) {
        console.info(msg);
    }
    data(msg) {
        console.info(msg);
    }
    help(msg) {
        console.warn(msg);
    }
    warn(msg) {
        console.warn(msg);
    }
    error(msg) {
        console.error(msg);
    }
}

var Logger = require('./lib/JSW-Logger')(BaseLogger, null, null, null, _, true);

module.exports = Logger;