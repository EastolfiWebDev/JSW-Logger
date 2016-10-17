/**
 * @file JSW-Logger.js - Logging class extending Winston (@link https://github.com/winstonjs/winston) module
 * @version 0.0.1
 * 
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 */

// var path = require("path"),
//     fs = require('fs-extra'),
//     _ = require("lodash"),
//     winston = require("winston"),
//     winstonLogger = winston.Logger;
    
const TRANSPORT_PREFIX = 'EAMP_LOGGER';

// Singleton instance
let singleton = Symbol();
let singletonEnforcer = Symbol();

let defaultOptions = {
    hideAllLogs: false,
    throwError: true,
    handledExceptionsLogPath: '/../logs/handledException.log'
};

module.exports = function(baseLogger, winston, path, fs, _, browser) {

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
     * @param {String|Array} [options.throwError=true] - Whether if throw an exception when logged trought the Logger#throw method
     */
    class Logger extends baseLogger {
        constructor(enforcer, options = {}) {
            if(enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");
            
            if (!browser) {
                super({
                    transports: [
                        new winston.transports.Console({
                            name: `${TRANSPORT_PREFIX}_debug-console`,
                            level: 'error'
                        })
                    ]
                });
            } else {
                super();
            }
            
            this.options = _.assign(this.options, defaultOptions, options);
            
            if (!browser) {
                // Ensuring that the log file exists
                let handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);
                
                fs.ensureFileSync(handledExceptionsLogPath);
                
                this.logger = new winston.Logger({
                    transports: [
                        new winston.transports.File({
                            name: `${TRANSPORT_PREFIX}_exception-file`,
                            filename: handledExceptionsLogPath,
                            level: 'error',
                            json: false,
                            colorize: true
                        })
                    ]
                });
            } else {
                this.logger = this;
            }
            
            if (options.hideAllLogs) {
                this.remove(`${TRANSPORT_PREFIX}_debug-console`);
            }
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
            
            this.logger.error(error);
            
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
                console.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
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
    
    return Logger;
};