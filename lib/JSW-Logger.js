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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU1ctTG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFNLG1CQUFtQixhQUF6Qjs7O0FBR0EsSUFBSSxZQUFZLHVCQUFoQjtBQUNBLElBQUksb0JBQW9CLHVCQUF4Qjs7QUFFQSxJQUFJLGlCQUFpQjtBQUNqQixpQkFBYSxLQURJO0FBRWpCLGdCQUFZLElBRks7QUFHakIsOEJBQTBCO0FBSFQsQ0FBckI7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLFVBQVMsVUFBVCxFQUFxQixPQUFyQixFQUE4QixJQUE5QixFQUFvQyxFQUFwQyxFQUF3QyxDQUF4QyxFQUEyQyxPQUEzQyxFQUFvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFFBcUIzRCxNQXJCMkQ7QUFBQTs7QUFzQjdELHdCQUFZLFFBQVosRUFBb0M7QUFBQSxnQkFBZCxPQUFjLHlEQUFKLEVBQUk7QUFBQTs7QUFDaEMsZ0JBQUcsWUFBWSxpQkFBZixFQUFrQyxNQUFNLElBQUksS0FBSixDQUFVLDRCQUFWLENBQU47O0FBRWxDLGdCQUFJLENBQUMsT0FBTCxFQUFjO0FBQUEsNEhBQ0o7QUFDRixnQ0FBWSxDQUNSLElBQUksUUFBUSxVQUFSLENBQW1CLE9BQXZCLENBQStCO0FBQzNCLDhCQUFTLGdCQUFULG1CQUQyQjtBQUUzQiwrQkFBTztBQUZvQixxQkFBL0IsQ0FEUTtBQURWLGlCQURJO0FBU2IsYUFURCxNQVNPO0FBQUE7QUFFTjs7QUFFRCxrQkFBSyxPQUFMLEdBQWUsRUFBRSxNQUFGLENBQVMsTUFBSyxPQUFkLEVBQXVCLGNBQXZCLEVBQXVDLE9BQXZDLENBQWY7O0FBRUEsZ0JBQUksQ0FBQyxPQUFMLEVBQWM7O0FBRVYsb0JBQUksMkJBQTJCLEtBQUssT0FBTCxDQUFhLFlBQVksZUFBZSx3QkFBeEMsQ0FBL0I7O0FBRUEsbUJBQUcsY0FBSCxDQUFrQix3QkFBbEI7O0FBRUEsc0JBQUssTUFBTCxHQUFjLElBQUksUUFBUSxNQUFaLENBQW1CO0FBQzdCLGdDQUFZLENBQ1IsSUFBSSxRQUFRLFVBQVIsQ0FBbUIsSUFBdkIsQ0FBNEI7QUFDeEIsOEJBQVMsZ0JBQVQsb0JBRHdCO0FBRXhCLGtDQUFVLHdCQUZjO0FBR3hCLCtCQUFPLE9BSGlCO0FBSXhCLDhCQUFNLEtBSmtCO0FBS3hCLGtDQUFVO0FBTGMscUJBQTVCLENBRFE7QUFEaUIsaUJBQW5CLENBQWQ7QUFXSCxhQWpCRCxNQWlCTztBQUNILHNCQUFLLE1BQUw7QUFDSDs7QUFFRCxnQkFBSSxRQUFRLFdBQVosRUFBeUI7QUFDckIsc0JBQUssTUFBTCxDQUFlLGdCQUFmO0FBQ0g7QUF6QytCO0FBMENuQzs7Ozs7Ozs7Ozs7O0FBaEU0RDtBQUFBO0FBQUEsbUNBMEV2RCxLQTFFdUQsRUEwRWhEO0FBQ1Qsb0JBQUksRUFBRSxRQUFGLENBQVcsS0FBWCxDQUFKLEVBQXVCLFFBQVEsSUFBSSxLQUFKLENBQVUsS0FBVixDQUFSOztBQUV2QixxQkFBSyxNQUFMLENBQVksS0FBWixDQUFrQixLQUFsQjs7QUFFQSxvQkFBSSxLQUFLLE9BQUwsQ0FBYSxVQUFqQixFQUE2QixNQUFNLEtBQU47QUFDaEM7Ozs7Ozs7Ozs7QUFoRjREO0FBQUE7Ozs7Ozs7Ozs7Ozs7QUFBQSx3Q0E0RzFDLE9BNUcwQyxFQTRHakM7QUFDeEIsb0JBQUksRUFBRSxLQUFGLENBQVEsS0FBSyxTQUFMLENBQVIsQ0FBSixFQUE4QjtBQUMxQix5QkFBSyxTQUFMLElBQWtCLElBQUksTUFBSixDQUFXLGlCQUFYLEVBQThCLE9BQTlCLENBQWxCO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPLFFBQVAsQ0FBZ0IsS0FBaEIsQ0FBc0IsbUZBQXRCO0FBQ0g7O0FBRUQsdUJBQU8sT0FBTyxRQUFkO0FBQ0g7Ozs7Ozs7O0FBcEg0RDtBQUFBO0FBQUEsNkNBMkhyQztBQUNwQix1QkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUNIO0FBN0g0RDtBQUFBO0FBQUEsZ0NBeUZ2QztBQUNsQixvQkFBSSxFQUFFLEtBQUYsQ0FBUSxLQUFLLFNBQUwsQ0FBUixDQUFKLEVBQThCO0FBQzFCLHlCQUFLLFNBQUwsSUFBa0IsSUFBSSxNQUFKLENBQVcsaUJBQVgsQ0FBbEI7QUFDSDs7QUFFRCx1QkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUVIO0FBaEc0RDtBQUFBO0FBQUEsTUFxQjVDLFVBckI0Qzs7QUFnSWpFLFdBQU8sTUFBUDtBQUNILENBaklEIiwiZmlsZSI6IkpTVy1Mb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEpTVy1Mb2dnZXIuanMgLSBMb2dnaW5nIGNsYXNzIGV4dGVuZGluZyBXaW5zdG9uIChAbGluayBodHRwczovL2dpdGh1Yi5jb20vd2luc3RvbmpzL3dpbnN0b24pIG1vZHVsZVxuICogQHZlcnNpb24gMC4wLjFcbiAqIFxuICogQGF1dGhvciBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2IEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZWRcbiAqL1xuXG4vLyB2YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpLFxuLy8gICAgIGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKSxcbi8vICAgICBfID0gcmVxdWlyZShcImxvZGFzaFwiKSxcbi8vICAgICB3aW5zdG9uID0gcmVxdWlyZShcIndpbnN0b25cIiksXG4vLyAgICAgd2luc3RvbkxvZ2dlciA9IHdpbnN0b24uTG9nZ2VyO1xuICAgIFxuY29uc3QgVFJBTlNQT1JUX1BSRUZJWCA9ICdFQU1QX0xPR0dFUic7XG5cbi8vIFNpbmdsZXRvbiBpbnN0YW5jZVxubGV0IHNpbmdsZXRvbiA9IFN5bWJvbCgpO1xubGV0IHNpbmdsZXRvbkVuZm9yY2VyID0gU3ltYm9sKCk7XG5cbmxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBoaWRlQWxsTG9nczogZmFsc2UsXG4gICAgdGhyb3dFcnJvcjogdHJ1ZSxcbiAgICBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGg6ICcvLi4vbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmFzZUxvZ2dlciwgd2luc3RvbiwgcGF0aCwgZnMsIF8sIGJyb3dzZXIpIHtcblxuICAgIC8qKlxuICAgICAqIExvZ2dlclxuICAgICAqIFxuICAgICAqIEBtb2R1bGUgTG9nZ2VyXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICogXG4gICAgICogQGNsYXNzZGVzYyBMb2dnaW5nIG1vZHVsZSBzaW5nbGV0b24gd2hpY2ggaW5oZXJpdHMgdGhlIFdpbnN0b24gTG9nZ2VyIG1vZHVsZS5cbiAgICAgKiAgICAgICAgICBCeSBkZWZhdWx0OiBcbiAgICAgKiAgICAgICAgICAgICAgPG9sPlxuICAgICAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBhbGwgdGhlIEhBTkRMRUQgZXhjZXB0aW9ucyB1bmRlciBhIGxvZyBmaWxlIGluIFwibG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiPC9saT5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxsaT5Xcml0ZXMgaW4gdGhlIGNvbnNvbGUgYWxsIHdhcm5pbmdzIGFuZCBlcnJvczwvbGk+XG4gICAgICogICAgICAgICAgICAgIDwvb2w+XG4gICAgICogXG4gICAgICogQHBhcmFtIHtTeW1ib2x9IGVuZm9yY2VyIC0gRW5mb3JjZXIgaW50ZXJuYWwgb2JqZWN0IHRvIGF2b2lkIGluc3RhbmNpYXRpbmcgYXMgXCJuZXcgTG9nZ2VyKClcIlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gW29wdGlvbnMudGhyb3dFcnJvcj10cnVlXSAtIFdoZXRoZXIgaWYgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gbG9nZ2VkIHRyb3VnaHQgdGhlIExvZ2dlciN0aHJvdyBtZXRob2RcbiAgICAgKi9cbiAgICBjbGFzcyBMb2dnZXIgZXh0ZW5kcyBiYXNlTG9nZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZW5mb3JjZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgaWYoZW5mb3JjZXIgIT0gc2luZ2xldG9uRW5mb3JjZXIpIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3Qgc2luZ2xldG9uXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gXy5hc3NpZ24odGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghYnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgZGVmYXVsdE9wdGlvbnMuaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyhoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IHdpbnN0b24uTG9nZ2VyKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtUUkFOU1BPUlRfUFJFRklYfV9leGNlcHRpb24tZmlsZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmhpZGVBbGxMb2dzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogTWV0aG9kIHRvIHRocm93IGEgY29udHJvbGxlZCBleGNlcHRpb24sIGxvZ2dpbmcgaXQgdG8gYSBsb2cgZmlsZS5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBtZXRob2QgTG9nZ2VyI3Rocm93XG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0ge0Vycm9yfFN0cmluZ30gZXJyb3IgLSBUaGUgZXhjZXB0aW9uIG9yIG1lc3NhZ2UgdG8gYmUgdGhyb3duLlxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt0aHJvd0Vycm9yPXRydWVdIC0gU2FtZSBhcyBMb2dnZXItPm9wdGlvbnMtPnRocm93RXJyb3JcbiAgICAgICAgICovXG4gICAgICAgIHRocm93KGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhlcnJvcikpIGVycm9yID0gbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRocm93RXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC5cbiAgICAgICAgICogXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogXG4gICAgICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0IGluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpc1tzaW5nbGV0b25dO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlLCBjcmVhdGluZyBhIG5ldyBvbmUgaWYgbmVlZGVkLiBcbiAgICAgICAgICogSXQgYWxsb3dzLCB3aGVuIGNyZWF0aW5nIHRoZSBmaXJzdCB0aW1lLCBhIHNldCBvZiBvcHRpb25zLiBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICAgICAgICogXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnMuIFNlZSB7QGxpbmsgTG9nZ2VyI2NvbnN0cnVjdG9yfVxuICAgICAgICAgKiBcbiAgICAgICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXRJbnN0YW5jZShvcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlciwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5lcnJvcihcIlNpbmdsZXRvbiBhbHJlYWR5IGluc3RhbmNpYXRlZC4gSWdub3Jpbmcgb3B0aW9ucyBhbmQgcmV0cmlldmluZyBjdXJyZW50IGluc3RhbmNlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIExvZ2dlci5pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgX19kcm9wSW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpc1tzaW5nbGV0b25dO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBMb2dnZXI7XG59OyJdfQ==
