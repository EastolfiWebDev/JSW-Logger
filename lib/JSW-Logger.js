'use strict';

/**
 * @file JSW-Logger.js - Logging class extending Winston (@link https://github.com/winstonjs/winston) module
 * @version 0.0.1
 * 
 * @author Eduardo Astolfi <eastolfi91@gmail.com>
 * @copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>
 * @license MIT Licensed
 */

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require("lodash");

var TRANSPORT_PREFIX = 'EAMP_LOGGER';

// Singleton instance
var singleton = (0, _symbol2.default)();
var singletonEnforcer = (0, _symbol2.default)();

var defaultOptions = {
    level: 2, // logging info, warn and error by default
    hideAllLogs: false,
    hideLevelLog: false,
    throwError: true,
    handledExceptionsLogPath: '/../logs/handledException.log'
};

var LEVELS = {
    'silly': 6,
    'debug': 5,
    'verbose': 4,
    'log': 3,
    'info': 2,
    'warn': 1,
    'error': 0
};

var LEVELS_STR = ['ERROR', 'WARN', 'INFO', 'LOG', 'VERBOSE', 'DEBUG', 'SILLY'];

function interpolate(string, values) {
    var str = string;
    var i = 0;

    while (str.match(/%./)) {
        var match = str.match(/%./)[0];

        if (match.toLowerCase() === '%s') {
            str = str.replace(match, '' + values[i]);
        } else if (match.toLowerCase() === '%d') {
            str = str.replace(match, +values[i]);
        }

        i++;
    }

    return str;
}

// function ensureFile(file, cb) {
//     fs.exists(file, exists => {
//         if (!exists) {
//             fs.writeFile(file, '', err => {
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

var Logger = function () {
    function Logger(enforcer) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        (0, _classCallCheck3.default)(this, Logger);

        if (enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");

        // super({
        //     transports: [
        //         new winston.transports.Console({
        //             name: `${TRANSPORT_PREFIX}_debug-console`,
        //             level: 'error'
        //         })
        //     ]
        // });

        this.options = _.assign(this.options, defaultOptions, options);

        // Ensuring that the log file exists
        // let handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);

        // ensureFile(handledExceptionsLogPath, error => {
        //     if (error) throw new Error(error);

        //     this.logger = new winston.Logger({
        //         transports: [
        //             new winston.transports.File({
        //                 name: `${TRANSPORT_PREFIX}_exception-file`,
        //                 filename: handledExceptionsLogPath,
        //                 level: 'error',
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

    (0, _createClass3.default)(Logger, [{
        key: 'log',
        value: function log(level, message) {
            for (var _len = arguments.length, options = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                options[_key - 2] = arguments[_key];
            }

            if (_.isNil(level)) {
                level = LEVELS.log;
                message = '';
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

            var logMethod = console.log;

            // If level is lower than 0, that means we dont log anything
            if (level > 0) {
                if (level === 0) {
                    // Error
                    if (console.error) logMethod = console.error;
                } else if (level === 1) {
                    // Warning
                    if (console.warn) logMethod = console.warn;
                } else if (level === 2) {
                    // Information
                    if (console.info) logMethod = console.info;
                }
            }

            if (this.options.hideLevelLog) {
                message = '' + message;
            } else {
                message = LEVELS_STR[level] + ': ' + message;
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
    }, {
        key: 'silly',
        value: function silly(message) {
            for (var _len2 = arguments.length, options = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                options[_key2 - 1] = arguments[_key2];
            }

            return this.log(LEVELS.silly, message || '', options);
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            for (var _len3 = arguments.length, options = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                options[_key3 - 1] = arguments[_key3];
            }

            return this.log(LEVELS.debug, message || '', options);
        }
    }, {
        key: 'verbose',
        value: function verbose(message) {
            for (var _len4 = arguments.length, options = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                options[_key4 - 1] = arguments[_key4];
            }

            return this.log(LEVELS.verbose, message || '', options);
        }
    }, {
        key: 'info',
        value: function info(message) {
            for (var _len5 = arguments.length, options = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                options[_key5 - 1] = arguments[_key5];
            }

            return this.log(LEVELS.info, message || '', options);
        }
    }, {
        key: 'inform',
        value: function inform(message) {
            for (var _len6 = arguments.length, options = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                options[_key6 - 1] = arguments[_key6];
            }

            return this.log(LEVELS.info, message || '', options);
        }
    }, {
        key: 'information',
        value: function information(message) {
            for (var _len7 = arguments.length, options = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
                options[_key7 - 1] = arguments[_key7];
            }

            return this.log(LEVELS.info, message || '', options);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            for (var _len8 = arguments.length, options = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
                options[_key8 - 1] = arguments[_key8];
            }

            return this.log(LEVELS.warn, message || '', options);
        }
    }, {
        key: 'warning',
        value: function warning(message) {
            for (var _len9 = arguments.length, options = Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
                options[_key9 - 1] = arguments[_key9];
            }

            return this.log(LEVELS.warn, message || '', options);
        }
    }, {
        key: 'error',
        value: function error(message) {
            for (var _len10 = arguments.length, options = Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
                options[_key10 - 1] = arguments[_key10];
            }

            return this.log(LEVELS.error, message || '', options);
        }

        /**
         * Method to throw a controlled exception, logging it to a log file.
         * 
         * @method Logger#throw
         * 
         * @param {Error|String} error - The exception or message to be thrown.
         * @param {Boolean} [throwError=true] - Same as Logger->options->throwError
         */

    }, {
        key: 'throw',
        value: function _throw(error) {
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

    }], [{
        key: 'getInstance',


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
        value: function getInstance(options) {
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

    }, {
        key: '__dropInstance',
        value: function __dropInstance() {
            delete this[singleton];
        }
    }, {
        key: 'instance',
        get: function get() {
            if (_.isNil(this[singleton])) {
                this[singleton] = new Logger(singletonEnforcer);
            }

            return this[singleton];
        }
    }]);
    return Logger;
}();

module.exports = Logger;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpTVy1Mb2dnZXIuanMiXSwibmFtZXMiOlsiXyIsInJlcXVpcmUiLCJUUkFOU1BPUlRfUFJFRklYIiwic2luZ2xldG9uIiwic2luZ2xldG9uRW5mb3JjZXIiLCJkZWZhdWx0T3B0aW9ucyIsImxldmVsIiwiaGlkZUFsbExvZ3MiLCJoaWRlTGV2ZWxMb2ciLCJ0aHJvd0Vycm9yIiwiaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoIiwiTEVWRUxTIiwiTEVWRUxTX1NUUiIsImludGVycG9sYXRlIiwic3RyaW5nIiwidmFsdWVzIiwic3RyIiwiaSIsIm1hdGNoIiwidG9Mb3dlckNhc2UiLCJyZXBsYWNlIiwiTG9nZ2VyIiwiZW5mb3JjZXIiLCJvcHRpb25zIiwiRXJyb3IiLCJhc3NpZ24iLCJtZXNzYWdlIiwiaXNOaWwiLCJsb2ciLCJpc05hTiIsInRvTnVtYmVyIiwibGVuZ3RoIiwibG9nTWV0aG9kIiwiY29uc29sZSIsImVycm9yIiwid2FybiIsImluZm8iLCJzaWxseSIsImRlYnVnIiwidmVyYm9zZSIsImlzU3RyaW5nIiwiaW5zdGFuY2UiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFJQSxJQUFJQyxRQUFRLFFBQVIsQ0FBUjs7QUFFQSxJQUFNQyxtQkFBbUIsYUFBekI7O0FBRUE7QUFDQSxJQUFJQyxZQUFZLHVCQUFoQjtBQUNBLElBQUlDLG9CQUFvQix1QkFBeEI7O0FBRUEsSUFBSUMsaUJBQWlCO0FBQ2pCQyxXQUFPLENBRFUsRUFDTDtBQUNaQyxpQkFBYSxLQUZJO0FBR2pCQyxrQkFBYyxLQUhHO0FBSWpCQyxnQkFBWSxJQUpLO0FBS2pCQyw4QkFBMEI7QUFMVCxDQUFyQjs7QUFRQSxJQUFNQyxTQUFTO0FBQ1gsYUFBWSxDQUREO0FBRVgsYUFBWSxDQUZEO0FBR1gsZUFBWSxDQUhEO0FBSVgsV0FBWSxDQUpEO0FBS1gsWUFBWSxDQUxEO0FBTVgsWUFBWSxDQU5EO0FB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QUFPO0FBQ1QsZ0JBQUlsQyxFQUFFd0MsUUFBRixDQUFXTixLQUFYLENBQUosRUFBdUJBLFFBQVEsSUFBSVYsS0FBSixDQUFVVSxLQUFWLENBQVI7O0FBRXZCLGlCQUFLQSxLQUFMLENBQVdBLE1BQU1SLE9BQWpCOztBQUVBLGdCQUFJLEtBQUtILE9BQUwsQ0FBYWQsVUFBakIsRUFBNkIsTUFBTXlCLEtBQU47QUFDaEM7O0FBRUQ7Ozs7Ozs7Ozs7OztBQWdCQTs7Ozs7Ozs7OztvQ0FVbUJYLE8sRUFBUztBQUN4QixnQkFBSXZCLEVBQUUyQixLQUFGLENBQVEsS0FBS3hCLFNBQUwsQ0FBUixDQUFKLEVBQThCO0FBQzFCLHFCQUFLQSxTQUFMLElBQWtCLElBQUlrQixNQUFKLENBQVdqQixpQkFBWCxFQUE4Qm1CLE9BQTlCLENBQWxCO0FBQ0gsYUFGRCxNQUVPO0FBQ0hGLHVCQUFPb0IsUUFBUCxDQUFnQlAsS0FBaEIsQ0FBc0IsbUZBQXRCO0FBQ0g7O0FBRUQsbUJBQU9iLE9BQU9vQixRQUFkO0FBQ0g7O0FBRUQ7Ozs7Ozs7O3lDQUt3QjtBQUNwQixtQkFBTyxLQUFLdEMsU0FBTCxDQUFQO0FBQ0g7Ozs0QkFwQ3FCO0FBQ2xCLGdCQUFJSCxFQUFFMkIsS0FBRixDQUFRLEtBQUt4QixTQUFMLENBQVIsQ0FBSixFQUE4QjtBQUMxQixxQkFBS0EsU0FBTCxJQUFrQixJQUFJa0IsTUFBSixDQUFXakIsaUJBQVgsQ0FBbEI7QUFDSDs7QUFFRCxtQkFBTyxLQUFLRCxTQUFMLENBQVA7QUFFSDs7Ozs7QUFnQ0x1QyxPQUFPQyxPQUFQLEdBQWlCdEIsTUFBakIiLCJmaWxlIjoiSlNXLUxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBAZmlsZSBKU1ctTG9nZ2VyLmpzIC0gTG9nZ2luZyBjbGFzcyBleHRlbmRpbmcgV2luc3RvbiAoQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3dpbnN0b25qcy93aW5zdG9uKSBtb2R1bGVcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBcbiAqIEBhdXRob3IgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNiBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuICAgIFxuY29uc3QgVFJBTlNQT1JUX1BSRUZJWCA9ICdFQU1QX0xPR0dFUic7XG5cbi8vIFNpbmdsZXRvbiBpbnN0YW5jZVxubGV0IHNpbmdsZXRvbiA9IFN5bWJvbCgpO1xubGV0IHNpbmdsZXRvbkVuZm9yY2VyID0gU3ltYm9sKCk7XG5cbmxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBsZXZlbDogMiwgICAvLyBsb2dnaW5nIGluZm8sIHdhcm4gYW5kIGVycm9yIGJ5IGRlZmF1bHRcbiAgICBoaWRlQWxsTG9nczogZmFsc2UsXG4gICAgaGlkZUxldmVsTG9nOiBmYWxzZSxcbiAgICB0aHJvd0Vycm9yOiB0cnVlLFxuICAgIGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aDogJy8uLi9sb2dzL2hhbmRsZWRFeGNlcHRpb24ubG9nJ1xufTtcblxuY29uc3QgTEVWRUxTID0ge1xuICAgICdzaWxseSc6ICAgIDYsXG4gICAgJ2RlYnVnJzogICAgNSxcbiAgICAndmVyYm9zZSc6ICA0LFxuICAgICdsb2cnOiAgICAgIDMsXG4gICAgJ2luZm8nOiAgICAgMixcbiAgICAnd2Fybic6ICAgICAxLFxuICAgICdlcnJvcic6ICAgIDBcbn07XG5cbmNvbnN0IExFVkVMU19TVFIgPSBbJ0VSUk9SJywgJ1dBUk4nLCAnSU5GTycsICdMT0cnLCAnVkVSQk9TRScsICdERUJVRycsICdTSUxMWSddO1xuXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZShzdHJpbmcsIHZhbHVlcykge1xuICAgIHZhciBzdHIgPSBzdHJpbmc7XG4gICAgdmFyIGkgPSAwO1xuICAgIFxuICAgIHdoaWxlIChzdHIubWF0Y2goLyUuLykpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKC8lLi8pWzBdO1xuICAgIFxuICAgICAgICBpZiAobWF0Y2gudG9Mb3dlckNhc2UoKSA9PT0gJyVzJykge1xuICAgICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UobWF0Y2gsICcnICsgdmFsdWVzW2ldKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaC50b0xvd2VyQ2FzZSgpID09PSAnJWQnKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShtYXRjaCwgK3ZhbHVlc1tpXSk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaSsrO1xuICAgIH1cblxuICAgIHJldHVybiBzdHI7XG59XG5cbi8vIGZ1bmN0aW9uIGVuc3VyZUZpbGUoZmlsZSwgY2IpIHtcbi8vICAgICBmcy5leGlzdHMoZmlsZSwgZXhpc3RzID0+IHtcbi8vICAgICAgICAgaWYgKCFleGlzdHMpIHtcbi8vICAgICAgICAgICAgIGZzLndyaXRlRmlsZShmaWxlLCAnJywgZXJyID0+IHtcbi8vICAgICAgICAgICAgICAgICBjYihlcnIpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBjYihudWxsKTtcbi8vICAgICAgICAgfVxuLy8gICAgIH0pO1xuLy8gfVxuXG4vKipcbiAqIExvZ2dlclxuICogXG4gKiBAbW9kdWxlIExvZ2dlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAc2luY2UgMS4wLjBcbiAqIFxuICogQGNsYXNzZGVzYyBMb2dnaW5nIG1vZHVsZSBzaW5nbGV0b24gd2hpY2ggaW5oZXJpdHMgdGhlIFdpbnN0b24gTG9nZ2VyIG1vZHVsZS5cbiAqICAgICAgICAgIEJ5IGRlZmF1bHQ6IFxuICogICAgICAgICAgICAgIDxvbD5cbiAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBhbGwgdGhlIEhBTkRMRUQgZXhjZXB0aW9ucyB1bmRlciBhIGxvZyBmaWxlIGluIFwibG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiPC9saT5cbiAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBpbiB0aGUgY29uc29sZSBhbGwgd2FybmluZ3MgYW5kIGVycm9zPC9saT5cbiAqICAgICAgICAgICAgICA8L29sPlxuICogXG4gKiBAcGFyYW0ge1N5bWJvbH0gZW5mb3JjZXIgLSBFbmZvcmNlciBpbnRlcm5hbCBvYmplY3QgdG8gYXZvaWQgaW5zdGFuY2lhdGluZyBhcyBcIm5ldyBMb2dnZXIoKVwiXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zXG4gKiBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaGlkZUFsbExvZ3M9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSBoaWRlcyBhbGwgbG9ncyAodXNlZnVsbCB3aGVuIHJ1bm5pbmcgdGVzdHMpXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnRocm93RXJyb3I9dHJ1ZV0gLSBXaGV0aGVyIGlmIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGxvZ2dlZCB0cm91Z2h0IHRoZSBMb2dnZXIjdGhyb3cgbWV0aG9kXG4gKi9cbmNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3IoZW5mb3JjZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICBpZihlbmZvcmNlciAhPSBzaW5nbGV0b25FbmZvcmNlcikgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNvbnN0cnVjdCBzaW5nbGV0b25cIik7XG4gICAgICAgIFxuICAgICAgICAvLyBzdXBlcih7XG4gICAgICAgIC8vICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgIC8vICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWAsXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InXG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgIF1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmFzc2lnbih0aGlzLm9wdGlvbnMsIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAvLyBsZXQgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSArIGRlZmF1bHRPcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgIFxuICAgICAgICAvLyBlbnN1cmVGaWxlKGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCwgZXJyb3IgPT4ge1xuICAgICAgICAvLyAgICAgaWYgKGVycm9yKSB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgIC8vICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAvLyAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZVxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxuICAgICAgICAvLyAgICAgICAgIF1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICBpZiAob3B0aW9ucy5oaWRlQWxsTG9ncykge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMucmVtb3ZlKGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgKTtcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmxvZ2dlci5yZW1vdmUoYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgfVxuICAgIFxuICAgIGxvZyhsZXZlbCwgbWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICBpZiAoXy5pc05pbChsZXZlbCkpIHtcbiAgICAgICAgICAgIGxldmVsID0gTEVWRUxTLmxvZztcbiAgICAgICAgICAgIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKF8uaXNOaWwobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBsZXZlbDtcbiAgICAgICAgICAgIGxldmVsID0gTEVWRUxTLmxvZztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKF8uaXNOaWwob3B0aW9ucykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKF8uaXNOYU4oXy50b051bWJlcihsZXZlbCkpKSB7XG4gICAgICAgICAgICBsZXZlbCA9IF8uaXNOaWwoTEVWRUxTW2xldmVsXSkgPyBMRVZFTFMubG9nIDogTEVWRUxTW2xldmVsXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldmVsID0gK2xldmVsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gaW50ZXJwb2xhdGUobWVzc2FnZSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBsb2dNZXRob2QgPSBjb25zb2xlLmxvZztcbiAgICAgICAgXG4gICAgICAgIC8vIElmIGxldmVsIGlzIGxvd2VyIHRoYW4gMCwgdGhhdCBtZWFucyB3ZSBkb250IGxvZyBhbnl0aGluZ1xuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHsgICAgICAgICAgLy8gRXJyb3JcbiAgICAgICAgICAgICAgICBpZiAoY29uc29sZS5lcnJvcikgbG9nTWV0aG9kID0gY29uc29sZS5lcnJvcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDEpIHsgICAvLyBXYXJuaW5nXG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUud2FybikgbG9nTWV0aG9kID0gY29uc29sZS53YXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMikgeyAgIC8vIEluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKGNvbnNvbGUuaW5mbykgbG9nTWV0aG9kID0gY29uc29sZS5pbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmhpZGVMZXZlbExvZykge1xuICAgICAgICAgICAgbWVzc2FnZSA9IGAke21lc3NhZ2V9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSBgJHtMRVZFTFNfU1RSW2xldmVsXX06ICR7bWVzc2FnZX1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAobGV2ZWwgPD0gdGhpcy5vcHRpb25zLmxldmVsKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5oaWRlQWxsTG9ncykge1xuICAgICAgICAgICAgICAgIGxvZ01ldGhvZChtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2lsbHkobWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLnNpbGx5LCBtZXNzYWdlIHx8ICcnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZGVidWcobWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmRlYnVnLCBtZXNzYWdlIHx8ICcnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgdmVyYm9zZShtZXNzYWdlLCAuLi5vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZyhMRVZFTFMudmVyYm9zZSwgbWVzc2FnZSB8fCAnJywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGluZm8obWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmluZm8sIG1lc3NhZ2UgfHwgJycsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpbmZvcm0obWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmluZm8sIG1lc3NhZ2UgfHwgJycsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpbmZvcm1hdGlvbihtZXNzYWdlLCAuLi5vcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZyhMRVZFTFMuaW5mbywgbWVzc2FnZSB8fCAnJywgb3B0aW9ucyk7XG4gICAgfVxuICAgIHdhcm4obWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLndhcm4sIG1lc3NhZ2UgfHwgJycsIG9wdGlvbnMpO1xuICAgIH1cbiAgICB3YXJuaW5nKG1lc3NhZ2UsIC4uLm9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9nKExFVkVMUy53YXJuLCBtZXNzYWdlIHx8ICcnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgZXJyb3IobWVzc2FnZSwgLi4ub3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2coTEVWRUxTLmVycm9yLCBtZXNzYWdlIHx8ICcnLCBvcHRpb25zKTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHRocm93IGEgY29udHJvbGxlZCBleGNlcHRpb24sIGxvZ2dpbmcgaXQgdG8gYSBsb2cgZmlsZS5cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIExvZ2dlciN0aHJvd1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXJyb3J8U3RyaW5nfSBlcnJvciAtIFRoZSBleGNlcHRpb24gb3IgbWVzc2FnZSB0byBiZSB0aHJvd24uXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbdGhyb3dFcnJvcj10cnVlXSAtIFNhbWUgYXMgTG9nZ2VyLT5vcHRpb25zLT50aHJvd0Vycm9yXG4gICAgICovXG4gICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoZXJyb3IpKSBlcnJvciA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aHJvd0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC5cbiAgICAgKiBcbiAgICAgKiBAc3RhdGljXG4gICAgICogXG4gICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xuICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuIFxuICAgICAqIEl0IGFsbG93cywgd2hlbiBjcmVhdGluZyB0aGUgZmlyc3QgdGltZSwgYSBzZXQgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuIFNlZSB7QGxpbmsgTG9nZ2VyI2NvbnN0cnVjdG9yfVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuZXJyb3IoXCJTaW5nbGV0b24gYWxyZWFkeSBpbnN0YW5jaWF0ZWQuIElnbm9yaW5nIG9wdGlvbnMgYW5kIHJldHJpZXZpbmcgY3VycmVudCBpbnN0YW5jZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBMb2dnZXIuaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBfX2Ryb3BJbnN0YW5jZSgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNbc2luZ2xldG9uXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2VyOyJdfQ==
