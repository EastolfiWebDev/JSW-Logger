'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var TRANSPORT_PREFIX = 'EAMP_LOGGER';

// Singleton instance
var singleton = (0, _symbol2.default)();
var singletonEnforcer = (0, _symbol2.default)();

var defaultOptions = {
    hideAllLogs: false,
    throwError: true,
    handledExceptionsLogPath: '/../logs/handledException.log'
};

module.exports = function (baseLogger, winston, path, fs, _) {

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

    var Logger = function (_baseLogger) {
        (0, _inherits3.default)(Logger, _baseLogger);

        function Logger(enforcer) {
            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            (0, _classCallCheck3.default)(this, Logger);

            if (enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");

            var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Logger).call(this, {
                transports: [new winston.transports.Console({
                    name: TRANSPORT_PREFIX + '_debug-console',
                    level: 'error'
                })]
            }));

            _this.options = _.assign(_this.options, defaultOptions, options);

            // Ensuring that the log file exists
            var handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);

            fs.ensureFileSync(handledExceptionsLogPath);

            _this.logger = new winston.Logger({
                transports: [new winston.transports.File({
                    name: TRANSPORT_PREFIX + '_exception-file',
                    filename: handledExceptionsLogPath,
                    level: 'error',
                    json: false,
                    colorize: true
                })]
            });

            if (options.hideAllLogs) {
                _this.remove(TRANSPORT_PREFIX + '_debug-console');
            }
            return _this;
        }

        /**
         * Method to throw a controlled exception, logging it to a log file.
         * 
         * @method Logger#throw
         * 
         * @param {Error|String} error - The exception or message to be thrown.
         * @param {Boolean} [throwError=true] - Same as Logger->options->throwError
         */


        (0, _createClass3.default)(Logger, [{
            key: 'throw',
            value: function _throw(error) {
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
    }(baseLogger);

    return Logger;
};
//# sourceMappingURL=data:application/json;base64,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QUFFSDtBQXhGbUQ7QUFBQTtBQUFBLE1BcUJuQyxVQXJCbUM7O0FBd0h4RCxXQUFPLE1BQVA7QUFDSCxDQXpIRCIsImZpbGUiOiJKU1ctTG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBKU1ctTG9nZ2VyLmpzIC0gTG9nZ2luZyBjbGFzcyBleHRlbmRpbmcgV2luc3RvbiAoQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3dpbnN0b25qcy93aW5zdG9uKSBtb2R1bGVcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBcbiAqIEBhdXRob3IgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNiBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2VkXG4gKi9cblxuLy8gdmFyIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKSxcbi8vICAgICBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyksXG4vLyAgICAgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIiksXG4vLyAgICAgd2luc3RvbiA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpLFxuLy8gICAgIHdpbnN0b25Mb2dnZXIgPSB3aW5zdG9uLkxvZ2dlcjtcbiAgICBcbmNvbnN0IFRSQU5TUE9SVF9QUkVGSVggPSAnRUFNUF9MT0dHRVInO1xuXG4vLyBTaW5nbGV0b24gaW5zdGFuY2VcbmxldCBzaW5nbGV0b24gPSBTeW1ib2woKTtcbmxldCBzaW5nbGV0b25FbmZvcmNlciA9IFN5bWJvbCgpO1xuXG5sZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaGlkZUFsbExvZ3M6IGZhbHNlLFxuICAgIHRocm93RXJyb3I6IHRydWUsXG4gICAgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoOiAnLy4uL2xvZ3MvaGFuZGxlZEV4Y2VwdGlvbi5sb2cnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJhc2VMb2dnZXIsIHdpbnN0b24sIHBhdGgsIGZzLCBfKSB7XG5cbiAgICAvKipcbiAgICAgKiBMb2dnZXJcbiAgICAgKiBcbiAgICAgKiBAbW9kdWxlIExvZ2dlclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBzaW5jZSAxLjAuMFxuICAgICAqIFxuICAgICAqIEBjbGFzc2Rlc2MgTG9nZ2luZyBtb2R1bGUgc2luZ2xldG9uIHdoaWNoIGluaGVyaXRzIHRoZSBXaW5zdG9uIExvZ2dlciBtb2R1bGUuXG4gICAgICogICAgICAgICAgQnkgZGVmYXVsdDogXG4gICAgICogICAgICAgICAgICAgIDxvbD5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxsaT5Xcml0ZXMgYWxsIHRoZSBIQU5ETEVEIGV4Y2VwdGlvbnMgdW5kZXIgYSBsb2cgZmlsZSBpbiBcImxvZ3MvaGFuZGxlZEV4Y2VwdGlvbi5sb2dcIjwvbGk+XG4gICAgICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGluIHRoZSBjb25zb2xlIGFsbCB3YXJuaW5ncyBhbmQgZXJyb3M8L2xpPlxuICAgICAqICAgICAgICAgICAgICA8L29sPlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3ltYm9sfSBlbmZvcmNlciAtIEVuZm9yY2VyIGludGVybmFsIG9iamVjdCB0byBhdm9pZCBpbnN0YW5jaWF0aW5nIGFzIFwibmV3IExvZ2dlcigpXCJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IFtvcHRpb25zLnRocm93RXJyb3I9dHJ1ZV0gLSBXaGV0aGVyIGlmIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGxvZ2dlZCB0cm91Z2h0IHRoZSBMb2dnZXIjdGhyb3cgbWV0aG9kXG4gICAgICovXG4gICAgY2xhc3MgTG9nZ2VyIGV4dGVuZHMgYmFzZUxvZ2dlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGVuZm9yY2VyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIGlmKGVuZm9yY2VyICE9IHNpbmdsZXRvbkVuZm9yY2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29uc3RydWN0IHNpbmdsZXRvblwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gXy5hc3NpZ24odGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgbGV0IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUgKyBkZWZhdWx0T3B0aW9ucy5oYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyhoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oaWRlQWxsTG9ncykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1ldGhvZCB0byB0aHJvdyBhIGNvbnRyb2xsZWQgZXhjZXB0aW9uLCBsb2dnaW5nIGl0IHRvIGEgbG9nIGZpbGUuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAbWV0aG9kIExvZ2dlciN0aHJvd1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtFcnJvcnxTdHJpbmd9IGVycm9yIC0gVGhlIGV4Y2VwdGlvbiBvciBtZXNzYWdlIHRvIGJlIHRocm93bi5cbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbdGhyb3dFcnJvcj10cnVlXSAtIFNhbWUgYXMgTG9nZ2VyLT5vcHRpb25zLT50aHJvd0Vycm9yXG4gICAgICAgICAqL1xuICAgICAgICB0aHJvdyhlcnJvcikge1xuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoZXJyb3IpKSBlcnJvciA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aHJvd0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC4gXG4gICAgICAgICAqIEl0IGFsbG93cywgd2hlbiBjcmVhdGluZyB0aGUgZmlyc3QgdGltZSwgYSBzZXQgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLiBTZWUge0BsaW5rIExvZ2dlciNjb25zdHJ1Y3Rvcn1cbiAgICAgICAgICogXG4gICAgICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuZXJyb3IoXCJTaW5nbGV0b24gYWxyZWFkeSBpbnN0YW5jaWF0ZWQuIElnbm9yaW5nIG9wdGlvbnMgYW5kIHJldHJpZXZpbmcgY3VycmVudCBpbnN0YW5jZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBMb2dnZXIuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIF9fZHJvcEluc3RhbmNlKCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gTG9nZ2VyO1xufTsiXX0=
