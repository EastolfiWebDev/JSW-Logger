var path = require("path"),
    fs = require('fs-extra'),
    _ = require("lodash"),
    winston = require("winston"),
    winstonLogger = winston.Logger;


var Logger = require('./lib/JSW-Logger');

module.exports = Logger(winstonLogger, winston, path, fs, _, false);