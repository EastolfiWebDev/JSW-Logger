"use strict";

/**
 * @file JSW-Logger.js - Logging class extending Winston (@link https://github.com/winstonjs/winston) module
 * @version 0.0.1
 * 
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 */

import * as _ from "lodash";
    
const TRANSPORT_PREFIX = "EAMP_LOGGER";

// Singleton instance
const singleton = Symbol();
const singletonEnforcer = Symbol();

class Options {
    public level: Number;                          // logging info, warn and error by default
    public hideAllLogs: boolean;
    public hideLevelLog: boolean;
    public throwError: boolean;
    public handledExceptionsLogPath: String;
    
    private __defaultOptions = {
        level: 2,
        hideAllLogs: false,
        hideLevelLog: false,
        throwError: true,
        handledExceptionsLogPath: "/../logs/handledException.log"
    };
    
    constructor(options?) {
        if (_.isNil(options)) {
            options = {}
        }
        
        this.level = (options.level ? options.level : this.__defaultOptions.level);
        this.hideAllLogs = (_.isBoolean(options.hideAllLogs) ? options.hideAllLogs : this.__defaultOptions.hideAllLogs);
        this.hideLevelLog = (_.isBoolean(options.hideLevelLog) ? options.hideLevelLog : this.__defaultOptions.hideLevelLog);
        this.throwError = (_.isBoolean(options.throwError) ? options.throwError : this.__defaultOptions.throwError);
        this.handledExceptionsLogPath = (options.handledExceptionsLogPath ? options.handledExceptionsLogPath : this.__defaultOptions.handledExceptionsLogPath);
    }
}

const LEVELS = {
    "silly":    6,
    "debug":    5,
    "verbose":  4,
    "log":      3,
    "info":     2,
    "warn":     1,
    "error":    0
};

const LEVELS_STR = ["ERROR", "WARN", "INFO", "LOG", "VERBOSE", "DEBUG", "SILLY"];

function interpolate(string, values) {
    var str = string;
    var i = 0;
    
    while (str.match(/%./)) {
        var match = str.match(/%./)[0];
    
        if (match.toLowerCase() === "%s") {
            str = str.replace(match, "" + values[i]);
        } else if (match.toLowerCase() === "%d") {
            str = str.replace(match, +values[i]);
        }
    
        i++;
    }

    return str;
}

// function ensureFile(file, cb) {
//     fs.exists(file, exists => {
//         if (!exists) {
//             fs.writeFile(file, "", err => {
//                 cb(err);
//             });
//         } else {
//             cb(null);
//         }
//     });
// }

/**
 * Logger
 * 
 * @module Logger
 * @constructor
 * @since 1.0.0
 * 
 * @classdesc Logging module singleton which inherits the Winston Logger module.
 *          By default: 
 *              <ol>
 *                  <li>Writes all the HANDLED exceptions under a log file in "logs/handledException.log"</li>
 *                  <li>Writes in the console all warnings and erros</li>
 *              </ol>
 * 
 * @param {Symbol} enforcer - Enforcer internal object to avoid instanciating as "new Logger()"
 * @param {Object} [options] - Additional options
 * 
 * @param {Boolean} [options.hideAllLogs=false] - When set to true hides all logs (usefull when running tests)
 * @param {Boolean} [options.throwError=true] - Whether if throw an exception when logged trought the Logger#throw method
 */
class Logger {
    private options: Options = new Options();
    
    constructor(enforcer, options = {}) {
        if(enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");
        
        // super({
        //     transports: [
        //         new winston.transports.Console({
        //             name: `${TRANSPORT_PREFIX}_debug-console`,
        //             level: "error"
        //         })
        //     ]
        // });
        
        //this.options = _.assign({}, this.options, options);
        this.options = new Options(options);
        
        // Ensuring that the log file exists
        // let handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);
        
        // ensureFile(handledExceptionsLogPath, error => {
        //     if (error) throw new Error(error);
            
        //     this.logger = new winston.Logger({
        //         transports: [
        //             new winston.transports.File({
        //                 name: `${TRANSPORT_PREFIX}_exception-file`,
        //                 filename: handledExceptionsLogPath,
        //                 level: "error",
        //                 json: false,
        //                 colorize: true
        //             })
        //         ]
        //     });
            
        //     if (options.hideAllLogs) {
        //         this.remove(`${TRANSPORT_PREFIX}_debug-console`);
        //         this.logger.remove(`${TRANSPORT_PREFIX}_exception-file`);
        //     }
        // });
    }
    
    log(level, message, ...options) {
        if (_.isNil(level)) {
            level = LEVELS.log;
            message = "";
            options = [];
        }
        
        if (_.isNil(message)) {
            message = level;
            level = LEVELS.log;
            options = [];
        }
        
        if (_.isNil(options)) {
            options = [];
        }
        
        if (_.isNaN(_.toNumber(level))) {
            level = _.isNil(LEVELS[level]) ? LEVELS.log : LEVELS[level];
        } else {
            level = +level;
        }
        
        if (options.length > 0) {
            message = interpolate(message, options);
        }
        
        let logMethod = console.log;
        
        // If level is lower than 0, that means we dont log anything
        if (level > 0) {
            if (level === 0) {          // Error
                if (console.error) logMethod = console.error;
            } else if (level === 1) {   // Warning
                if (console.warn) logMethod = console.warn;
            } else if (level === 2) {   // Information
                if (console.info) logMethod = console.info;
            }
        }
        
        if (this.options.hideLevelLog) {
            message = `${message}`;
        } else {
            message = `${LEVELS_STR[level]}: ${message}`;
        }
        
        if (level <= this.options.level) {
            if (!this.options.hideAllLogs) {
                logMethod(message);
            }
            
            return message;
        } else {
            return false;
        }
    }
    
    silly(message, ...options) {
        return this.log(LEVELS.silly, message || "", options);
    }
    debug(message, ...options) {
        return this.log(LEVELS.debug, message || "", options);
    }
    verbose(message, ...options) {
        return this.log(LEVELS.verbose, message || "", options);
    }
    info(message, ...options) {
        return this.log(LEVELS.info, message || "", options);
    }
    inform(message, ...options) {
        return this.log(LEVELS.info, message || "", options);
    }
    information(message, ...options) {
        return this.log(LEVELS.info, message || "", options);
    }
    warn(message, ...options) {
        return this.log(LEVELS.warn, message || "", options);
    }
    warning(message, ...options) {
        return this.log(LEVELS.warn, message || "", options);
    }
    error(message, ...options) {
        return this.log(LEVELS.error, message || "", options);
    }
    
    /**
     * Method to throw a controlled exception, logging it to a log file.
     * 
     * @method Logger#throw
     * 
     * @param {Error|String} error - The exception or message to be thrown.
     * @param {Boolean} [throwError=true] - Same as Logger->options->throwError
     */
    throw(error) {
        if (_.isString(error)) error = new Error(error);
        
        this.error(error.message);
        
        if (this.options.throwError) throw error;
    }
    
    /**
     * Retrieves the current singleton instance, creating a new one if needed.
     * 
     * @static
     * 
     * @returns {Logger} this - The singleton Instance
     */
    static get instance() {
        if (_.isNil(this[singleton])) {
            this[singleton] = new Logger(singletonEnforcer);
        }
        
        return this[singleton];
        
    }
    
    /**
     * Retrieves the current singleton instance, creating a new one if needed. 
     * It allows, when creating the first time, a set of options. Otherwise, it will return the singleton instance
     * 
     * @static
     * 
     * @param {Object} [options] - Additional options. See {@link Logger#constructor}
     * 
     * @returns {Logger} this - The singleton Instance
     */
    static getInstance(options) {
        if (_.isNil(this[singleton])) {
            this[singleton] = new Logger(singletonEnforcer, options);
        } else {
            Logger.instance.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
        }
        
        return Logger.instance;
    }
    
    /**
     * Destroy the current singleton instance
     * 
     * @static
     */
    static __dropInstance() {
        delete this[singleton];
    }
}

// module.exports = Logger;
export = Logger;