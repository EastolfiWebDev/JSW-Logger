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

module.exports = function (baseLogger, winston, path, fs, _, browser) {

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

            if (!browser) {
                var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Logger).call(this, {
                    transports: [new winston.transports.Console({
                        name: TRANSPORT_PREFIX + '_debug-console',
                        level: 'error'
                    })]
                }));
            } else {
                var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Logger).call(this));
            }

            _this.options = _.assign(_this.options, defaultOptions, options);

            if (!browser) {
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
            } else {
                _this.logger = _this;
            }

            if (options.hideAllLogs) {
                _this.remove(TRANSPORT_PREFIX + '_debug-console');
            }
            return (0, _possibleConstructorReturn3.default)(_this);
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
                    console.error("Singleton already instanciated. Ignoring options and retrieving current instance.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU1ctTG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFNLG1CQUFtQixhQUF6Qjs7O0FBR0EsSUFBSSxZQUFZLHVCQUFoQjtBQUNBLElBQUksb0JBQW9CLHVCQUF4Qjs7QUFFQSxJQUFJLGlCQUFpQjtBQUNqQixpQkFBYSxLQURJO0FBRWpCLGdCQUFZLElBRks7QUFHakIsOEJBQTBCO0FBSFQsQ0FBckI7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFVBQVMsVUFBVCxFQUFxQixPQUFyQixFQUE4QixJQUE5QixFQUFvQyxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxPQUEzQyxFQUFvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFFBcUIzRCxNQXJCMkQ7QUFBQTs7QUFzQjdELHdCQUFZLFFBQVosRUFBb0M7QUFBQSxnQkFBZCxPQUFjLHlEQUFKLEVBQUk7QUFBQTs7QUFDaEMsZ0JBQUcsWUFBWSxpQkFBZixFQUFrQyxNQUFNLElBQUksS0FBSixDQUFVLDRCQUFWLENBQU47O0FBRWxDLGdCQUFJLENBQUMsT0FBTCxFQUFjO0FBQUEsNEhBQ0o7QUFDRixnQ0FBWSxDQUNSLElBQUksUUFBUSxVQUFSLENBQW1CLE9BQXZCLENBQStCO0FBQzNCLDhCQUFTLGdCQUFULG1CQUQyQjtBQUUzQiwrQkFBTztBQUZvQixxQkFBL0IsQ0FEUTtBQURWLGlCQURJO0FBU2IsYUFURCxNQVNPO0FBQUE7QUFFTjs7QUFFRCxrQkFBSyxPQUFMLEdBQWUsRUFBRSxNQUFGLENBQVMsTUFBSyxPQUFkLEVBQXVCLGNBQXZCLEVBQXVDLE9BQXZDLENBQWY7O0FBRUEsZ0JBQUksQ0FBQyxPQUFMLEVBQWM7O0FBRVYsb0JBQUksMkJBQTJCLEtBQUssT0FBTCxDQUFhLFlBQVksZUFBZSx3QkFBeEMsQ0FBL0I7O0FBRUEsbUJBQUcsY0FBSCxDQUFrQix3QkFBbEI7O0FBRUEsc0JBQUssTUFBTCxHQUFjLElBQUksUUFBUSxNQUFaLENBQW1CO0FBQzdCLGdDQUFZLENBQ1IsSUFBSSxRQUFRLFVBQVIsQ0FBbUIsSUFBdkIsQ0FBNEI7QUFDeEIsOEJBQVMsZ0JBQVQsb0JBRHdCO0FBRXhCLGtDQUFVLHdCQUZjO0FBR3hCLCtCQUFPLE9BSGlCO0FBSXhCLDhCQUFNLEtBSmtCO0FBS3hCLGtDQUFVO0FBTGMscUJBQTVCLENBRFE7QUFEaUIsaUJBQW5CLENBQWQ7QUFXSCxhQWpCRCxNQWlCTztBQUNILHNCQUFLLE1BQUw7QUFDSDs7QUFFRCxnQkFBSSxRQUFRLFdBQVosRUFBeUI7QUFDckIsc0JBQUssTUFBTCxDQUFlLGdCQUFmO0FBQ0g7QUF6QytCO0FBMENuQzs7Ozs7Ozs7Ozs7O0FBaEU0RDtBQUFBO0FBQUEsbUNBMEV2RCxLQTFFdUQsRUEwRWhEO0FBQ1Qsb0JBQUksRUFBRSxRQUFGLENBQVcsS0FBWCxDQUFKLEVBQXVCLFFBQVEsSUFBSSxLQUFKLENBQVUsS0FBVixDQUFSOztBQUV2QixxQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQjs7QUFFQSxvQkFBSSxLQUFLLE9BQUwsQ0FBYSxVQUFqQixFQUE2QixNQUFNLEtBQU47QUFDaEM7Ozs7Ozs7Ozs7QUFoRjREO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0E0RzFDLE9BNUcwQyxFQTRHakM7QUFDeEIsb0JBQUksRUFBRSxLQUFGLENBQVEsS0FBSyxTQUFMLENBQVIsQ0FBSixFQUE4QjtBQUMxQix5QkFBSyxTQUFMLElBQWtCLElBQUksTUFBSixDQUFXLGlCQUFYLEVBQThCLE9BQTlCLENBQWxCO0FBQ0gsaUJBRkQsTUFFTztBQUNILDRCQUFRLEtBQVIsQ0FBYyxtRkFBZDtBQUNIOztBQUVELHVCQUFPLE9BQU8sUUFBZDtBQUNIOzs7Ozs7OztBQXBINEQ7QUFBQTtBQUFBLDZDQTJIckM7QUFDcEIsdUJBQU8sS0FBSyxTQUFMLENBQVA7QUFDSDtBQTdINEQ7QUFBQTtBQUFBLGdDQXlGdkM7QUFDbEIsb0JBQUksRUFBRSxLQUFGLENBQVEsS0FBSyxTQUFMLENBQVIsQ0FBSixFQUE4QjtBQUMxQix5QkFBSyxTQUFMLElBQWtCLElBQUksTUFBSixDQUFXLGlCQUFYLENBQWxCO0FBQ0g7O0FBRUQsdUJBQU8sS0FBSyxTQUFMLENBQVA7QUFFSDtBQWhHNEQ7QUFBQTtBQUFBLE1BcUI1QyxVQXJCNEM7O0FBZ0lqRSxXQUFPLE1BQVA7QUFDSCxDQWpJRCIsImZpbGUiOiJKU1ctTG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBKU1ctTG9nZ2VyLmpzIC0gTG9nZ2luZyBjbGFzcyBleHRlbmRpbmcgV2luc3RvbiAoQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3dpbnN0b25qcy93aW5zdG9uKSBtb2R1bGVcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBcbiAqIEBhdXRob3IgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNiBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2VkXG4gKi9cblxuLy8gdmFyIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKSxcbi8vICAgICBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyksXG4vLyAgICAgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIiksXG4vLyAgICAgd2luc3RvbiA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpLFxuLy8gICAgIHdpbnN0b25Mb2dnZXIgPSB3aW5zdG9uLkxvZ2dlcjtcbiAgICBcbmNvbnN0IFRSQU5TUE9SVF9QUkVGSVggPSAnRUFNUF9MT0dHRVInO1xuXG4vLyBTaW5nbGV0b24gaW5zdGFuY2VcbmxldCBzaW5nbGV0b24gPSBTeW1ib2woKTtcbmxldCBzaW5nbGV0b25FbmZvcmNlciA9IFN5bWJvbCgpO1xuXG5sZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgaGlkZUFsbExvZ3M6IGZhbHNlLFxuICAgIHRocm93RXJyb3I6IHRydWUsXG4gICAgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoOiAnLy4uL2xvZ3MvaGFuZGxlZEV4Y2VwdGlvbi5sb2cnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJhc2VMb2dnZXIsIHdpbnN0b24sIHBhdGgsIGZzLCBfLCBicm93c2VyKSB7XG5cbiAgICAvKipcbiAgICAgKiBMb2dnZXJcbiAgICAgKiBcbiAgICAgKiBAbW9kdWxlIExvZ2dlclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqIEBzaW5jZSAxLjAuMFxuICAgICAqIFxuICAgICAqIEBjbGFzc2Rlc2MgTG9nZ2luZyBtb2R1bGUgc2luZ2xldG9uIHdoaWNoIGluaGVyaXRzIHRoZSBXaW5zdG9uIExvZ2dlciBtb2R1bGUuXG4gICAgICogICAgICAgICAgQnkgZGVmYXVsdDogXG4gICAgICogICAgICAgICAgICAgIDxvbD5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxsaT5Xcml0ZXMgYWxsIHRoZSBIQU5ETEVEIGV4Y2VwdGlvbnMgdW5kZXIgYSBsb2cgZmlsZSBpbiBcImxvZ3MvaGFuZGxlZEV4Y2VwdGlvbi5sb2dcIjwvbGk+XG4gICAgICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGluIHRoZSBjb25zb2xlIGFsbCB3YXJuaW5ncyBhbmQgZXJyb3M8L2xpPlxuICAgICAqICAgICAgICAgICAgICA8L29sPlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3ltYm9sfSBlbmZvcmNlciAtIEVuZm9yY2VyIGludGVybmFsIG9iamVjdCB0byBhdm9pZCBpbnN0YW5jaWF0aW5nIGFzIFwibmV3IExvZ2dlcigpXCJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IFtvcHRpb25zLnRocm93RXJyb3I9dHJ1ZV0gLSBXaGV0aGVyIGlmIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGxvZ2dlZCB0cm91Z2h0IHRoZSBMb2dnZXIjdGhyb3cgbWV0aG9kXG4gICAgICovXG4gICAgY2xhc3MgTG9nZ2VyIGV4dGVuZHMgYmFzZUxvZ2dlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGVuZm9yY2VyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIGlmKGVuZm9yY2VyICE9IHNpbmdsZXRvbkVuZm9yY2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29uc3RydWN0IHNpbmdsZXRvblwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFicm93c2VyKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IF8uYXNzaWduKHRoaXMub3B0aW9ucywgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBFbnN1cmluZyB0aGF0IHRoZSBsb2cgZmlsZSBleGlzdHNcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSArIGRlZmF1bHRPcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZnMuZW5zdXJlRmlsZVN5bmMoaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JpemU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oaWRlQWxsTG9ncykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1ldGhvZCB0byB0aHJvdyBhIGNvbnRyb2xsZWQgZXhjZXB0aW9uLCBsb2dnaW5nIGl0IHRvIGEgbG9nIGZpbGUuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAbWV0aG9kIExvZ2dlciN0aHJvd1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtFcnJvcnxTdHJpbmd9IGVycm9yIC0gVGhlIGV4Y2VwdGlvbiBvciBtZXNzYWdlIHRvIGJlIHRocm93bi5cbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbdGhyb3dFcnJvcj10cnVlXSAtIFNhbWUgYXMgTG9nZ2VyLT5vcHRpb25zLT50aHJvd0Vycm9yXG4gICAgICAgICAqL1xuICAgICAgICB0aHJvdyhlcnJvcikge1xuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoZXJyb3IpKSBlcnJvciA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aHJvd0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC4gXG4gICAgICAgICAqIEl0IGFsbG93cywgd2hlbiBjcmVhdGluZyB0aGUgZmlyc3QgdGltZSwgYSBzZXQgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLiBTZWUge0BsaW5rIExvZ2dlciNjb25zdHJ1Y3Rvcn1cbiAgICAgICAgICogXG4gICAgICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2luZ2xldG9uIGFscmVhZHkgaW5zdGFuY2lhdGVkLiBJZ25vcmluZyBvcHRpb25zIGFuZCByZXRyaWV2aW5nIGN1cnJlbnQgaW5zdGFuY2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gTG9nZ2VyLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVzdHJveSB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICAgICAgICogXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBfX2Ryb3BJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzW3NpbmdsZXRvbl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIExvZ2dlcjtcbn07Il19
