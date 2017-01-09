"use strict";
/**
 * @file JSW-Logger.js - Logging class extending Winston (@link https://github.com/winstonjs/winston) module
 * @version 0.0.1
 *
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 */
var _ = require("lodash");
var TRANSPORT_PREFIX = "EAMP_LOGGER";
// Singleton instance
var singleton = Symbol();
var singletonEnforcer = Symbol();
var Options = (function () {
    function Options(options) {
        this.__defaultOptions = {
            level: 2,
            hideAllLogs: false,
            hideLevelLog: false,
            throwError: true,
            handledExceptionsLogPath: "/../logs/handledException.log"
        };
        if (_.isNil(options)) {
            options = {};
        }
        this.level = (options.level ? options.level : this.__defaultOptions.level);
        this.hideAllLogs = (_.isBoolean(options.hideAllLogs) ? options.hideAllLogs : this.__defaultOptions.hideAllLogs);
        this.hideLevelLog = (_.isBoolean(options.hideLevelLog) ? options.hideLevelLog : this.__defaultOptions.hideLevelLog);
        this.throwError = (_.isBoolean(options.throwError) ? options.throwError : this.__defaultOptions.throwError);
        this.handledExceptionsLogPath = (options.handledExceptionsLogPath ? options.handledExceptionsLogPath : this.__defaultOptions.handledExceptionsLogPath);
    }
    return Options;
}());
var LEVELS = {
    "silly": 6,
    "debug": 5,
    "verbose": 4,
    "log": 3,
    "info": 2,
    "warn": 1,
    "error": 0
};
var LEVELS_STR = ["ERROR", "WARN", "INFO", "LOG", "VERBOSE", "DEBUG", "SILLY"];
function interpolate(string, values) {
    var str = string;
    var i = 0;
    while (str.match(/%./)) {
        var match = str.match(/%./)[0];
        if (match.toLowerCase() === "%s") {
            str = str.replace(match, "" + values[i]);
        }
        else if (match.toLowerCase() === "%d") {
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
var Logger = (function () {
    function Logger(enforcer, options) {
        if (options === void 0) { options = {}; }
        this.options = new Options();
        if (enforcer != singletonEnforcer)
            throw new Error("Cannot construct singleton");
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
    Logger.prototype.log = function (level, message) {
        var options = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            options[_i - 2] = arguments[_i];
        }
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
        }
        else {
            level = +level;
        }
        if (options.length > 0) {
            message = interpolate(message, options);
        }
        var logMethod = console.log;
        // If level is lower than 0, that means we dont log anything
        if (level > 0) {
            if (level === 0) {
                if (console.error)
                    logMethod = console.error;
            }
            else if (level === 1) {
                if (console.warn)
                    logMethod = console.warn;
            }
            else if (level === 2) {
                if (console.info)
                    logMethod = console.info;
            }
        }
        if (this.options.hideLevelLog) {
            message = "" + message;
        }
        else {
            message = LEVELS_STR[level] + ": " + message;
        }
        if (level <= this.options.level) {
            if (!this.options.hideAllLogs) {
                logMethod(message);
            }
            return message;
        }
        else {
            return false;
        }
    };
    Logger.prototype.silly = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.silly, message || "", options);
    };
    Logger.prototype.debug = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.debug, message || "", options);
    };
    Logger.prototype.verbose = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.verbose, message || "", options);
    };
    Logger.prototype.info = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.info, message || "", options);
    };
    Logger.prototype.inform = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.info, message || "", options);
    };
    Logger.prototype.information = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.info, message || "", options);
    };
    Logger.prototype.warn = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.warn, message || "", options);
    };
    Logger.prototype.warning = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.warn, message || "", options);
    };
    Logger.prototype.error = function (message) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.log(LEVELS.error, message || "", options);
    };
    /**
     * Method to throw a controlled exception, logging it to a log file.
     *
     * @method Logger#throw
     *
     * @param {Error|String} error - The exception or message to be thrown.
     * @param {Boolean} [throwError=true] - Same as Logger->options->throwError
     */
    Logger.prototype.throw = function (error) {
        if (_.isString(error))
            error = new Error(error);
        this.error(error.message);
        if (this.options.throwError)
            throw error;
    };
    Object.defineProperty(Logger, "instance", {
        /**
         * Retrieves the current singleton instance, creating a new one if needed.
         *
         * @static
         *
         * @returns {Logger} this - The singleton Instance
         */
        get: function () {
            if (_.isNil(this[singleton])) {
                this[singleton] = new Logger(singletonEnforcer);
            }
            return this[singleton];
        },
        enumerable: true,
        configurable: true
    });
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
    Logger.getInstance = function (options) {
        if (_.isNil(this[singleton])) {
            this[singleton] = new Logger(singletonEnforcer, options);
        }
        else {
            Logger.instance.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
        }
        return Logger.instance;
    };
    /**
     * Destroy the current singleton instance
     *
     * @static
     */
    Logger.__dropInstance = function () {
        delete this[singleton];
    };
    return Logger;
}());
module.exports = Logger;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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USxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0kscUJBQWMsR0FBckI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0wsYUFBQztBQUFELENBNUxBLEFBNExDLElBQUE7QUFHRCxpQkFBUyxNQUFNLENBQUMiLCJmaWxlIjoiSlNXLUxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEBmaWxlIEpTVy1Mb2dnZXIuanMgLSBMb2dnaW5nIGNsYXNzIGV4dGVuZGluZyBXaW5zdG9uIChAbGluayBodHRwczovL2dpdGh1Yi5jb20vd2luc3RvbmpzL3dpbnN0b24pIG1vZHVsZVxuICogQHZlcnNpb24gMC4wLjFcbiAqIFxuICogQGF1dGhvciBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2IEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZWRcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbiAgICBcbmNvbnN0IFRSQU5TUE9SVF9QUkVGSVggPSBcIkVBTVBfTE9HR0VSXCI7XG5cbi8vIFNpbmdsZXRvbiBpbnN0YW5jZVxuY29uc3Qgc2luZ2xldG9uID0gU3ltYm9sKCk7XG5jb25zdCBzaW5nbGV0b25FbmZvcmNlciA9IFN5bWJvbCgpO1xuXG5jbGFzcyBPcHRpb25zIHtcbiAgICBwdWJsaWMgbGV2ZWw6IE51bWJlcjsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvZ2dpbmcgaW5mbywgd2FybiBhbmQgZXJyb3IgYnkgZGVmYXVsdFxuICAgIHB1YmxpYyBoaWRlQWxsTG9nczogYm9vbGVhbjtcbiAgICBwdWJsaWMgaGlkZUxldmVsTG9nOiBib29sZWFuO1xuICAgIHB1YmxpYyB0aHJvd0Vycm9yOiBib29sZWFuO1xuICAgIHB1YmxpYyBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGg6IFN0cmluZztcbiAgICBcbiAgICBwcml2YXRlIF9fZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIGxldmVsOiAyLFxuICAgICAgICBoaWRlQWxsTG9nczogZmFsc2UsXG4gICAgICAgIGhpZGVMZXZlbExvZzogZmFsc2UsXG4gICAgICAgIHRocm93RXJyb3I6IHRydWUsXG4gICAgICAgIGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aDogXCIvLi4vbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiXG4gICAgfTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPykge1xuICAgICAgICBpZiAoXy5pc05pbChvcHRpb25zKSkge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMubGV2ZWwgPSAob3B0aW9ucy5sZXZlbCA/IG9wdGlvbnMubGV2ZWwgOiB0aGlzLl9fZGVmYXVsdE9wdGlvbnMubGV2ZWwpO1xuICAgICAgICB0aGlzLmhpZGVBbGxMb2dzID0gKF8uaXNCb29sZWFuKG9wdGlvbnMuaGlkZUFsbExvZ3MpID8gb3B0aW9ucy5oaWRlQWxsTG9ncyA6IHRoaXMuX19kZWZhdWx0T3B0aW9ucy5oaWRlQWxsTG9ncyk7XG4gICAgICAgIHRoaXMuaGlkZUxldmVsTG9nID0gKF8uaXNCb29sZWFuKG9wdGlvbnMuaGlkZUxldmVsTG9nKSA/IG9wdGlvbnMuaGlkZUxldmVsTG9nIDogdGhpcy5fX2RlZmF1bHRPcHRpb25zLmhpZGVMZXZlbExvZyk7XG4gICAgICAgIHRoaXMudGhyb3dFcnJvciA9IChfLmlzQm9vbGVhbihvcHRpb25zLnRocm93RXJyb3IpID8gb3B0aW9ucy50aHJvd0Vycm9yIDogdGhpcy5fX2RlZmF1bHRPcHRpb25zLnRocm93RXJyb3IpO1xuICAgICAgICB0aGlzLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCA9IChvcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCA/IG9wdGlvbnMuaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoIDogdGhpcy5fX2RlZmF1bHRPcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgfVxufVxuXG5jb25zdCBMRVZFTFMgPSB7XG4gICAgXCJzaWxseVwiOiAgICA2LFxuICAgIFwiZGVidWdcIjogICAgNSxcbiAgICBcInZlcmJvc2VcIjogIDQsXG4gICAgXCJsb2dcIjogICAgICAzLFxuICAgIFwiaW5mb1wiOiAgICAgMixcbiAgICBcIndhcm5cIjogICAgIDEsXG4gICAgXCJlcnJvclwiOiAgICAwXG59O1xuXG5jb25zdCBMRVZFTFNfU1RSID0gW1wiRVJST1JcIiwgXCJXQVJOXCIsIFwiSU5GT1wiLCBcIkxPR1wiLCBcIlZFUkJPU0VcIiwgXCJERUJVR1wiLCBcIlNJTExZXCJdO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHJpbmcsIHZhbHVlcykge1xuICAgIHZhciBzdHIgPSBzdHJpbmc7XG4gICAgdmFyIGkgPSAwO1xuICAgIFxuICAgIHdoaWxlIChzdHIubWF0Y2goLyUuLykpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKC8lLi8pWzBdO1xuICAgIFxuICAgICAgICBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKSA9PT0gXCIlc1wiKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShtYXRjaCwgXCJcIiArIHZhbHVlc1tpXSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKSA9PT0gXCIlZFwiKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShtYXRjaCwgK3ZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG5cbi8vIGZ1bmN0aW9uIGVuc3VyZUZpbGUoZmlsZSwgY2IpIHtcbi8vICAgICBmcy5leGlzdHMoZmlsZSwgZXhpc3RzID0+IHtcbi8vICAgICAgICAgaWYgKCFleGlzdHMpIHtcbi8vICAgICAgICAgICAgIGZzLndyaXRlRmlsZShmaWxlLCBcIlwiLCBlcnIgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGNiKGVycik7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGNiKG51bGwpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9XG5cbi8qKlxuICogTG9nZ2VyXG4gKiBcbiAqIEBtb2R1bGUgTG9nZ2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBzaW5jZSAxLjAuMFxuICogXG4gKiBAY2xhc3NkZXNjIExvZ2dpbmcgbW9kdWxlIHNpbmdsZXRvbiB3aGljaCBpbmhlcml0cyB0aGUgV2luc3RvbiBMb2dnZXIgbW9kdWxlLlxuICogICAgICAgICAgQnkgZGVmYXVsdDogXG4gKiAgICAgICAgICAgICAgPG9sPlxuICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGFsbCB0aGUgSEFORExFRCBleGNlcHRpb25zIHVuZGVyIGEgbG9nIGZpbGUgaW4gXCJsb2dzL2hhbmRsZWRFeGNlcHRpb24ubG9nXCI8L2xpPlxuICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGluIHRoZSBjb25zb2xlIGFsbCB3YXJuaW5ncyBhbmQgZXJyb3M8L2xpPlxuICogICAgICAgICAgICAgIDwvb2w+XG4gKiBcbiAqIEBwYXJhbSB7U3ltYm9sfSBlbmZvcmNlciAtIEVuZm9yY2VyIGludGVybmFsIG9iamVjdCB0byBhdm9pZCBpbnN0YW5jaWF0aW5nIGFzIFwibmV3IExvZ2dlcigpXCJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAqIFxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5oaWRlQWxsTG9ncz1mYWxzZV0gLSBXaGVuIHNldCB0byB0cnVlIGhpZGVzIGFsbCBsb2dzICh1c2VmdWxsIHdoZW4gcnVubmluZyB0ZXN0cylcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMudGhyb3dFcnJvcj10cnVlXSAtIFdoZXRoZXIgaWYgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gbG9nZ2VkIHRyb3VnaHQgdGhlIExvZ2dlciN0aHJvdyBtZXRob2RcbiAqL1xuY2xhc3MgTG9nZ2VyIHtcbiAgICBwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnMgPSBuZXcgT3B0aW9ucygpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVuZm9yY2VyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYoZW5mb3JjZXIgIT0gc2luZ2xldG9uRW5mb3JjZXIpIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3Qgc2luZ2xldG9uXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gc3VwZXIoe1xuICAgICAgICAvLyAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAvLyAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgIC8vICAgICAgICAgICAgIG5hbWU6IGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgLFxuICAgICAgICAvLyAgICAgICAgICAgICBsZXZlbDogXCJlcnJvclwiXG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgIF1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIFxuICAgICAgICAvL3RoaXMub3B0aW9ucyA9IF8uYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAvLyBsZXQgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSArIGRlZmF1bHRPcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgIFxuICAgICAgICAvLyBlbnN1cmVGaWxlKGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCwgZXJyb3IgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgIC8vICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAvLyAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldmVsOiBcImVycm9yXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbG9yaXplOiB0cnVlXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXG4gICAgICAgIC8vICAgICAgICAgXVxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gICAgIGlmIChvcHRpb25zLmhpZGVBbGxMb2dzKSB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5yZW1vdmUoYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWApO1xuICAgICAgICAvLyAgICAgICAgIHRoaXMubG9nZ2VyLnJlbW92ZShgJHtUUkFOU1BPUlRfUFJFRklYfV9leGNlcHRpb24tZmlsZWApO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KTtcbiAgICB9XG4gICAgXG4gICAgbG9nKGxldmVsLCBtZXNzYWdlLCAuLi5vcHRpb25zKSB7XG4gICAgICAgIGlmIChfLmlzTmlsKGxldmVsKSkge1xuICAgICAgICAgICAgbGV2ZWwgPSBMRVZFTFMubG9nO1xuICAgICAgICAgICAgbWVzc2FnZSA9IFwiXCI7XG4gICAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChfLmlzTmlsKG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gbGV2ZWw7XG4gICAgICAgICAgICBsZXZlbCA9IExFVkVMUy5sb2c7XG4gICAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChfLmlzTmlsKG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChfLmlzTmFOKF8udG9OdW1iZXIobGV2ZWwpKSkge1xuICAgICAgICAgICAgbGV2ZWwgPSBfLmlzTmlsKExFVkVMU1tsZXZlbF0pID8gTEVWRUxTLmxvZyA6IExFVkVMU1tsZXZlbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXZlbCA9ICtsZXZlbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbWVzc2FnZSA9IGludGVycG9sYXRlKG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbG9nTWV0aG9kID0gY29uc29sZS5sb2c7XG4gICAgICAgIFxuICAgICAgICAvLyBJZiBsZXZlbCBpcyBsb3dlciB0aGFuIDAsIHRoYXQgbWVhbnMgd2UgZG9udCBsb2cgYW55dGhpbmdcbiAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7ICAgICAgICAgIC8vIEVycm9yXG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUuZXJyb3IpIGxvZ01ldGhvZCA9IGNvbnNvbGUuZXJyb3I7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAxKSB7ICAgLy8gV2FybmluZ1xuICAgICAgICAgICAgICAgIGlmIChjb25zb2xlLndhcm4pIGxvZ01ldGhvZCA9IGNvbnNvbGUud2FybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDIpIHsgICAvLyBJbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIGlmIChjb25zb2xlLmluZm8pIGxvZ01ldGhvZCA9IGNvbnNvbGUuaW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5oaWRlTGV2ZWxMb2cpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHttZXNzYWdlfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gYCR7TEVWRUxTX1NUUltsZXZlbF19OiAke21lc3NhZ2V9YDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGxldmVsIDw9IHRoaXMub3B0aW9ucy5sZXZlbCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuaGlkZUFsbExvZ3MpIHtcbiAgICAgICAgICAgICAgICBsb2dNZXRob2QobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBtZXNzYWdlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNpbGx5KG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy5zaWxseSwgbWVzc2FnZSB8fCBcIlwiLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZGVidWcobWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmRlYnVnLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB2ZXJib3NlKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy52ZXJib3NlLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpbmZvKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy5pbmZvLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpbmZvcm0obWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmluZm8sIG1lc3NhZ2UgfHwgXCJcIiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGluZm9ybWF0aW9uKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy5pbmZvLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB3YXJuKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy53YXJuLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB3YXJuaW5nKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy53YXJuLCBtZXNzYWdlIHx8IFwiXCIsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBlcnJvcihtZXNzYWdlLCAuLi5vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZyhMRVZFTFMuZXJyb3IsIG1lc3NhZ2UgfHwgXCJcIiwgb3B0aW9ucyk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byB0aHJvdyBhIGNvbnRyb2xsZWQgZXhjZXB0aW9uLCBsb2dnaW5nIGl0IHRvIGEgbG9nIGZpbGUuXG4gICAgICogXG4gICAgICogQG1ldGhvZCBMb2dnZXIjdGhyb3dcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Vycm9yfFN0cmluZ30gZXJyb3IgLSBUaGUgZXhjZXB0aW9uIG9yIG1lc3NhZ2UgdG8gYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Rocm93RXJyb3I9dHJ1ZV0gLSBTYW1lIGFzIExvZ2dlci0+b3B0aW9ucy0+dGhyb3dFcnJvclxuICAgICAqL1xuICAgIHRocm93KGVycm9yKSB7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGVycm9yKSkgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGhyb3dFcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzW3NpbmdsZXRvbl07XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlLCBjcmVhdGluZyBhIG5ldyBvbmUgaWYgbmVlZGVkLiBcbiAgICAgKiBJdCBhbGxvd3MsIHdoZW4gY3JlYXRpbmcgdGhlIGZpcnN0IHRpbWUsIGEgc2V0IG9mIG9wdGlvbnMuIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAqIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLiBTZWUge0BsaW5rIExvZ2dlciNjb25zdHJ1Y3Rvcn1cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRJbnN0YW5jZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmVycm9yKFwiU2luZ2xldG9uIGFscmVhZHkgaW5zdGFuY2lhdGVkLiBJZ25vcmluZyBvcHRpb25zIGFuZCByZXRyaWV2aW5nIGN1cnJlbnQgaW5zdGFuY2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gTG9nZ2VyLmluc3RhbmNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAqIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgX19kcm9wSW5zdGFuY2UoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW3NpbmdsZXRvbl07XG4gICAgfVxufVxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IExvZ2dlcjtcbmV4cG9ydCA9IExvZ2dlcjsiXX0=
