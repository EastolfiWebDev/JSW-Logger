"use strict";

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _symbol = require("babel-runtime/core-js/symbol");

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

var path = require("path"),
    fs = require('fs-extra'),
    _ = require("lodash"),
    winston = require("winston"),
    winstonLogger = winston.Logger;

var TRANSPORT_PREFIX = 'EAMP_LOGGER';

// Singleton instance
var singleton = (0, _symbol2.default)();
var singletonEnforcer = (0, _symbol2.default)();

var defaultOptions = {
    throwError: true,
    handledExceptionsLogPath: '/../logs/handledException.log'
};

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

var Logger = function (_winstonLogger) {
    (0, _inherits3.default)(Logger, _winstonLogger);

    function Logger(enforcer) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        (0, _classCallCheck3.default)(this, Logger);

        if (enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Logger).call(this, {
            transports: [new winston.transports.Console({
                name: TRANSPORT_PREFIX + "_debug-console",
                level: 'error'
            })]
        }));

        _this.options = _.assign(_this.options, defaultOptions, options);

        // Ensuring that the log file exists
        var handledExceptionsLogPath = path.resolve(__dirname + defaultOptions.handledExceptionsLogPath);

        fs.ensureFileSync(handledExceptionsLogPath);

        _this.logger = new winston.Logger({
            transports: [new winston.transports.File({
                name: TRANSPORT_PREFIX + "_exception-file",
                filename: handledExceptionsLogPath,
                level: 'error',
                json: false,
                colorize: true
            })]
        });
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
        key: "throw",
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
        key: "getInstance",


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
        key: "__dropInstance",
        value: function __dropInstance() {
            delete this[singleton];
        }
    }, {
        key: "instance",
        get: function get() {
            if (_.isNil(this[singleton])) {
                this[singleton] = new Logger(singletonEnforcer);
            }

            return this[singleton];
        }
    }]);
    return Logger;
}(winstonLogger);

module.exports = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU1ctTG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVg7SUFDSSxLQUFLLFFBQVEsVUFBUixDQURUO0lBRUksSUFBSSxRQUFRLFFBQVIsQ0FGUjtJQUdJLFVBQVUsUUFBUSxTQUFSLENBSGQ7SUFJSSxnQkFBZ0IsUUFBUSxNQUo1Qjs7QUFNQSxJQUFNLG1CQUFtQixhQUF6Qjs7O0FBR0EsSUFBSSxZQUFZLHVCQUFoQjtBQUNBLElBQUksb0JBQW9CLHVCQUF4Qjs7QUFFQSxJQUFJLGlCQUFpQjtBQUNqQixnQkFBWSxJQURLO0FBRWpCLDhCQUEwQjtBQUZULENBQXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JNLE07OztBQUNGLG9CQUFZLFFBQVosRUFBb0M7QUFBQSxZQUFkLE9BQWMseURBQUosRUFBSTtBQUFBOztBQUNoQyxZQUFHLFlBQVksaUJBQWYsRUFBa0MsTUFBTSxJQUFJLEtBQUosQ0FBVSw0QkFBVixDQUFOOztBQURGLG9IQUcxQjtBQUNGLHdCQUFZLENBQ1IsSUFBSSxRQUFRLFVBQVIsQ0FBbUIsT0FBdkIsQ0FBK0I7QUFDM0Isc0JBQVMsZ0JBQVQsbUJBRDJCO0FBRTNCLHVCQUFPO0FBRm9CLGFBQS9CLENBRFE7QUFEVixTQUgwQjs7QUFZaEMsY0FBSyxPQUFMLEdBQWUsRUFBRSxNQUFGLENBQVMsTUFBSyxPQUFkLEVBQXVCLGNBQXZCLEVBQXVDLE9BQXZDLENBQWY7OztBQUdBLFlBQUksMkJBQTJCLEtBQUssT0FBTCxDQUFhLFlBQVksZUFBZSx3QkFBeEMsQ0FBL0I7O0FBRUEsV0FBRyxjQUFILENBQWtCLHdCQUFsQjs7QUFFQSxjQUFLLE1BQUwsR0FBYyxJQUFJLFFBQVEsTUFBWixDQUFtQjtBQUM3Qix3QkFBWSxDQUNSLElBQUksUUFBUSxVQUFSLENBQW1CLElBQXZCLENBQTRCO0FBQ3hCLHNCQUFTLGdCQUFULG9CQUR3QjtBQUV4QiwwQkFBVSx3QkFGYztBQUd4Qix1QkFBTyxPQUhpQjtBQUl4QixzQkFBTSxLQUprQjtBQUt4QiwwQkFBVTtBQUxjLGFBQTVCLENBRFE7QUFEaUIsU0FBbkIsQ0FBZDtBQW5CZ0M7QUE4Qm5DOzs7Ozs7Ozs7Ozs7OzsrQkFVSyxLLEVBQU87QUFDVCxnQkFBSSxFQUFFLFFBQUYsQ0FBVyxLQUFYLENBQUosRUFBdUIsUUFBUSxJQUFJLEtBQUosQ0FBVSxLQUFWLENBQVI7O0FBRXZCLGlCQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCOztBQUVBLGdCQUFJLEtBQUssT0FBTCxDQUFhLFVBQWpCLEVBQTZCLE1BQU0sS0FBTjtBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQTRCa0IsTyxFQUFTO0FBQ3hCLGdCQUFJLEVBQUUsS0FBRixDQUFRLEtBQUssU0FBTCxDQUFSLENBQUosRUFBOEI7QUFDMUIscUJBQUssU0FBTCxJQUFrQixJQUFJLE1BQUosQ0FBVyxpQkFBWCxFQUE4QixPQUE5QixDQUFsQjtBQUNILGFBRkQsTUFFTztBQUNILHdCQUFRLEtBQVIsQ0FBYyxtRkFBZDtBQUNIOztBQUVELG1CQUFPLE9BQU8sUUFBZDtBQUNIOzs7Ozs7Ozs7O3lDQU91QjtBQUNwQixtQkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUNIOzs7NEJBcENxQjtBQUNsQixnQkFBSSxFQUFFLEtBQUYsQ0FBUSxLQUFLLFNBQUwsQ0FBUixDQUFKLEVBQThCO0FBQzFCLHFCQUFLLFNBQUwsSUFBa0IsSUFBSSxNQUFKLENBQVcsaUJBQVgsQ0FBbEI7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUVIOzs7RUEvRGdCLGE7O0FBK0ZyQixPQUFPLE9BQVAsR0FBaUIsTUFBakIiLCJmaWxlIjoiSlNXLUxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgSlNXLUxvZ2dlci5qcyAtIExvZ2dpbmcgY2xhc3MgZXh0ZW5kaW5nIFdpbnN0b24gKEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS93aW5zdG9uanMvd2luc3RvbikgbW9kdWxlXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogXG4gKiBAYXV0aG9yIEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTYgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlZFxuICovXG5cbnZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIiksXG4gICAgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpLFxuICAgIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpLFxuICAgIHdpbnN0b24gPSByZXF1aXJlKFwid2luc3RvblwiKSxcbiAgICB3aW5zdG9uTG9nZ2VyID0gd2luc3Rvbi5Mb2dnZXI7XG4gICAgXG5jb25zdCBUUkFOU1BPUlRfUFJFRklYID0gJ0VBTVBfTE9HR0VSJztcblxuLy8gU2luZ2xldG9uIGluc3RhbmNlXG5sZXQgc2luZ2xldG9uID0gU3ltYm9sKCk7XG5sZXQgc2luZ2xldG9uRW5mb3JjZXIgPSBTeW1ib2woKTtcblxubGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRocm93RXJyb3I6IHRydWUsXG4gICAgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoOiAnLy4uL2xvZ3MvaGFuZGxlZEV4Y2VwdGlvbi5sb2cnXG59O1xuXG4vKipcbiAqIExvZ2dlclxuICogXG4gKiBAbW9kdWxlIExvZ2dlclxuICogQGNvbnN0cnVjdG9yXG4gKiBAc2luY2UgMS4wLjBcbiAqIFxuICogQGNsYXNzZGVzYyBMb2dnaW5nIG1vZHVsZSBzaW5nbGV0b24gd2hpY2ggaW5oZXJpdHMgdGhlIFdpbnN0b24gTG9nZ2VyIG1vZHVsZS5cbiAqICAgICAgICAgIEJ5IGRlZmF1bHQ6IFxuICogICAgICAgICAgICAgIDxvbD5cbiAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBhbGwgdGhlIEhBTkRMRUQgZXhjZXB0aW9ucyB1bmRlciBhIGxvZyBmaWxlIGluIFwibG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiPC9saT5cbiAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBpbiB0aGUgY29uc29sZSBhbGwgd2FybmluZ3MgYW5kIGVycm9zPC9saT5cbiAqICAgICAgICAgICAgICA8L29sPlxuICogXG4gKiBAcGFyYW0ge1N5bWJvbH0gZW5mb3JjZXIgLSBFbmZvcmNlciBpbnRlcm5hbCBvYmplY3QgdG8gYXZvaWQgaW5zdGFuY2lhdGluZyBhcyBcIm5ldyBMb2dnZXIoKVwiXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zXG4gKiBcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBbb3B0aW9ucy50aHJvd0Vycm9yPXRydWVdIC0gV2hldGhlciBpZiB0aHJvdyBhbiBleGNlcHRpb24gd2hlbiBsb2dnZWQgdHJvdWdodCB0aGUgTG9nZ2VyI3Rocm93IG1ldGhvZFxuICovXG5jbGFzcyBMb2dnZXIgZXh0ZW5kcyB3aW5zdG9uTG9nZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihlbmZvcmNlciwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGlmKGVuZm9yY2VyICE9IHNpbmdsZXRvbkVuZm9yY2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29uc3RydWN0IHNpbmdsZXRvblwiKTtcbiAgICAgICAgXG4gICAgICAgIHN1cGVyKHtcbiAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtUUkFOU1BPUlRfUFJFRklYfV9kZWJ1Zy1jb25zb2xlYCxcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF8uYXNzaWduKHRoaXMub3B0aW9ucywgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgLy8gRW5zdXJpbmcgdGhhdCB0aGUgbG9nIGZpbGUgZXhpc3RzXG4gICAgICAgIGxldCBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgZGVmYXVsdE9wdGlvbnMuaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoKTtcbiAgICAgICAgXG4gICAgICAgIGZzLmVuc3VyZUZpbGVTeW5jKGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoLFxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yaXplOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byB0aHJvdyBhIGNvbnRyb2xsZWQgZXhjZXB0aW9uLCBsb2dnaW5nIGl0IHRvIGEgbG9nIGZpbGUuXG4gICAgICogXG4gICAgICogQG1ldGhvZCBMb2dnZXIjdGhyb3dcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Vycm9yfFN0cmluZ30gZXJyb3IgLSBUaGUgZXhjZXB0aW9uIG9yIG1lc3NhZ2UgdG8gYmUgdGhyb3duLlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Rocm93RXJyb3I9dHJ1ZV0gLSBTYW1lIGFzIExvZ2dlci0+b3B0aW9ucy0+dGhyb3dFcnJvclxuICAgICAqL1xuICAgIHRocm93KGVycm9yKSB7XG4gICAgICAgIGlmIChfLmlzU3RyaW5nKGVycm9yKSkgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aHJvd0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC5cbiAgICAgKiBcbiAgICAgKiBAc3RhdGljXG4gICAgICogXG4gICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xuICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuIFxuICAgICAqIEl0IGFsbG93cywgd2hlbiBjcmVhdGluZyB0aGUgZmlyc3QgdGltZSwgYSBzZXQgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuIFNlZSB7QGxpbmsgTG9nZ2VyI2NvbnN0cnVjdG9yfVxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICovXG4gICAgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlciwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU2luZ2xldG9uIGFscmVhZHkgaW5zdGFuY2lhdGVkLiBJZ25vcmluZyBvcHRpb25zIGFuZCByZXRyaWV2aW5nIGN1cnJlbnQgaW5zdGFuY2UuXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gTG9nZ2VyLmluc3RhbmNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAqIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKi9cbiAgICBzdGF0aWMgX19kcm9wSW5zdGFuY2UoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW3NpbmdsZXRvbl07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2dlcjsiXX0=
