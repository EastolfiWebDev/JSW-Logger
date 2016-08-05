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
//# sourceMappingURL=data:application/json;base64,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QWxCO0FBQ0g7O0FBRUQsdUJBQU8sS0FBSyxTQUFMLENBQVA7QUFFSDtBQTVGNEQ7QUFBQTtBQUFBLE1BcUI1QyxVQXJCNEM7O0FBNEhqRSxXQUFPLE1BQVA7QUFDSCxDQTdIRCIsImZpbGUiOiJKU1ctTG9nZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBKU1ctTG9nZ2VyLmpzIC0gTG9nZ2luZyBjbGFzcyBleHRlbmRpbmcgV2luc3RvbiAoQGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3dpbnN0b25qcy93aW5zdG9uKSBtb2R1bGVcbiAqIEB2ZXJzaW9uIDAuMC4xXG4gKiBcbiAqIEBhdXRob3IgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBjb3B5cmlnaHQgMjAxNiBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGxpY2Vuc2UgTUlUIExpY2Vuc2VkXG4gKi9cblxuLy8gdmFyIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKSxcbi8vICAgICBmcyA9IHJlcXVpcmUoJ2ZzLWV4dHJhJyksXG4vLyAgICAgXyA9IHJlcXVpcmUoXCJsb2Rhc2hcIiksXG4vLyAgICAgd2luc3RvbiA9IHJlcXVpcmUoXCJ3aW5zdG9uXCIpLFxuLy8gICAgIHdpbnN0b25Mb2dnZXIgPSB3aW5zdG9uLkxvZ2dlcjtcbiAgICBcbmNvbnN0IFRSQU5TUE9SVF9QUkVGSVggPSAnRUFNUF9MT0dHRVInO1xuXG4vLyBTaW5nbGV0b24gaW5zdGFuY2VcbmxldCBzaW5nbGV0b24gPSBTeW1ib2woKTtcbmxldCBzaW5nbGV0b25FbmZvcmNlciA9IFN5bWJvbCgpO1xuXG5sZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgdGhyb3dFcnJvcjogdHJ1ZSxcbiAgICBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGg6ICcvLi4vbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmFzZUxvZ2dlciwgd2luc3RvbiwgcGF0aCwgZnMsIF8sIGJyb3dzZXIpIHtcblxuICAgIC8qKlxuICAgICAqIExvZ2dlclxuICAgICAqIFxuICAgICAqIEBtb2R1bGUgTG9nZ2VyXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICogXG4gICAgICogQGNsYXNzZGVzYyBMb2dnaW5nIG1vZHVsZSBzaW5nbGV0b24gd2hpY2ggaW5oZXJpdHMgdGhlIFdpbnN0b24gTG9nZ2VyIG1vZHVsZS5cbiAgICAgKiAgICAgICAgICBCeSBkZWZhdWx0OiBcbiAgICAgKiAgICAgICAgICAgICAgPG9sPlxuICAgICAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBhbGwgdGhlIEhBTkRMRUQgZXhjZXB0aW9ucyB1bmRlciBhIGxvZyBmaWxlIGluIFwibG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiPC9saT5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxsaT5Xcml0ZXMgaW4gdGhlIGNvbnNvbGUgYWxsIHdhcm5pbmdzIGFuZCBlcnJvczwvbGk+XG4gICAgICogICAgICAgICAgICAgIDwvb2w+XG4gICAgICogXG4gICAgICogQHBhcmFtIHtTeW1ib2x9IGVuZm9yY2VyIC0gRW5mb3JjZXIgaW50ZXJuYWwgb2JqZWN0IHRvIGF2b2lkIGluc3RhbmNpYXRpbmcgYXMgXCJuZXcgTG9nZ2VyKClcIlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gW29wdGlvbnMudGhyb3dFcnJvcj10cnVlXSAtIFdoZXRoZXIgaWYgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gbG9nZ2VkIHRyb3VnaHQgdGhlIExvZ2dlciN0aHJvdyBtZXRob2RcbiAgICAgKi9cbiAgICBjbGFzcyBMb2dnZXIgZXh0ZW5kcyBiYXNlTG9nZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZW5mb3JjZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgaWYoZW5mb3JjZXIgIT0gc2luZ2xldG9uRW5mb3JjZXIpIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3Qgc2luZ2xldG9uXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWJyb3dzZXIpIHtcbiAgICAgICAgICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gXy5hc3NpZ24odGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghYnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgZGVmYXVsdE9wdGlvbnMuaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyhoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IHdpbnN0b24uTG9nZ2VyKHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtUUkFOU1BPUlRfUFJFRklYfV9leGNlcHRpb24tZmlsZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlciA9IHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNZXRob2QgdG8gdGhyb3cgYSBjb250cm9sbGVkIGV4Y2VwdGlvbiwgbG9nZ2luZyBpdCB0byBhIGxvZyBmaWxlLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQG1ldGhvZCBMb2dnZXIjdGhyb3dcbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSB7RXJyb3J8U3RyaW5nfSBlcnJvciAtIFRoZSBleGNlcHRpb24gb3IgbWVzc2FnZSB0byBiZSB0aHJvd24uXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Rocm93RXJyb3I9dHJ1ZV0gLSBTYW1lIGFzIExvZ2dlci0+b3B0aW9ucy0+dGhyb3dFcnJvclxuICAgICAgICAgKi9cbiAgICAgICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGVycm9yKSkgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGhyb3dFcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlLCBjcmVhdGluZyBhIG5ldyBvbmUgaWYgbmVlZGVkLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3NpbmdsZXRvbl07XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuIFxuICAgICAgICAgKiBJdCBhbGxvd3MsIHdoZW4gY3JlYXRpbmcgdGhlIGZpcnN0IHRpbWUsIGEgc2V0IG9mIG9wdGlvbnMuIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy4gU2VlIHtAbGluayBMb2dnZXIjY29uc3RydWN0b3J9XG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNpbmdsZXRvbiBhbHJlYWR5IGluc3RhbmNpYXRlZC4gSWdub3Jpbmcgb3B0aW9ucyBhbmQgcmV0cmlldmluZyBjdXJyZW50IGluc3RhbmNlLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIExvZ2dlci5pbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgX19kcm9wSW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpc1tzaW5nbGV0b25dO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBMb2dnZXI7XG59OyJdfQ==
