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
     * @param {String|Array} [options.hideAllLogs=false] - When set to true hides all logs (usefull when running tests)
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
                _this.remove(TRANSPORT_PREFIX + '_exception-file');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpTVy1Mb2dnZXIuanMiXSwibmFtZXMiOlsiVFJBTlNQT1JUX1BSRUZJWCIsInNpbmdsZXRvbiIsInNpbmdsZXRvbkVuZm9yY2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJoaWRlQWxsTG9ncyIsInRocm93RXJyb3IiLCJoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgiLCJtb2R1bGUiLCJleHBvcnRzIiwiYmFzZUxvZ2dlciIsIndpbnN0b24iLCJwYXRoIiwiZnMiLCJfIiwiTG9nZ2VyIiwiZW5mb3JjZXIiLCJvcHRpb25zIiwiRXJyb3IiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIm5hbWUiLCJsZXZlbCIsImFzc2lnbiIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJlbnN1cmVGaWxlU3luYyIsImxvZ2dlciIsIkZpbGUiLCJmaWxlbmFtZSIsImpzb24iLCJjb2xvcml6ZSIsInJlbW92ZSIsImVycm9yIiwiaXNTdHJpbmciLCJpc05pbCIsImluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsbUJBQW1CLGFBQXpCOztBQUVBO0FBQ0EsSUFBSUMsWUFBWSx1QkFBaEI7QUFDQSxJQUFJQyxvQkFBb0IsdUJBQXhCOztBQUVBLElBQUlDLGlCQUFpQjtBQUNqQkMsaUJBQWEsS0FESTtBQUVqQkMsZ0JBQVksSUFGSztBQUdqQkMsOEJBQTBCO0FBSFQsQ0FBckI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUIsVUFBU0MsVUFBVCxFQUFxQkMsT0FBckIsRUFBOEJDLElBQTlCLEVBQW9DQyxFQUFwQyxFQUF3Q0MsQ0FBeEMsRUFBMkM7O0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZ3RCxRQXNCbERDLE1BdEJrRDtBQUFBOztBQXVCcEQsd0JBQVlDLFFBQVosRUFBb0M7QUFBQSxnQkFBZEMsT0FBYyx5REFBSixFQUFJO0FBQUE7O0FBQ2hDLGdCQUFHRCxZQUFZYixpQkFBZixFQUFrQyxNQUFNLElBQUllLEtBQUosQ0FBVSw0QkFBVixDQUFOOztBQURGLHdIQUcxQjtBQUNGQyw0QkFBWSxDQUNSLElBQUlSLFFBQVFRLFVBQVIsQ0FBbUJDLE9BQXZCLENBQStCO0FBQzNCQywwQkFBU3BCLGdCQUFULG1CQUQyQjtBQUUzQnFCLDJCQUFPO0FBRm9CLGlCQUEvQixDQURRO0FBRFYsYUFIMEI7O0FBWWhDLGtCQUFLTCxPQUFMLEdBQWVILEVBQUVTLE1BQUYsQ0FBUyxNQUFLTixPQUFkLEVBQXVCYixjQUF2QixFQUF1Q2EsT0FBdkMsQ0FBZjs7QUFFQTtBQUNBLGdCQUFJViwyQkFBMkJLLEtBQUtZLE9BQUwsQ0FBYUMsWUFBWXJCLGVBQWVHLHdCQUF4QyxDQUEvQjs7QUFFQU0sZUFBR2EsY0FBSCxDQUFrQm5CLHdCQUFsQjs7QUFFQSxrQkFBS29CLE1BQUwsR0FBYyxJQUFJaEIsUUFBUUksTUFBWixDQUFtQjtBQUM3QkksNEJBQVksQ0FDUixJQUFJUixRQUFRUSxVQUFSLENBQW1CUyxJQUF2QixDQUE0QjtBQUN4QlAsMEJBQVNwQixnQkFBVCxvQkFEd0I7QUFFeEI0Qiw4QkFBVXRCLHdCQUZjO0FBR3hCZSwyQkFBTyxPQUhpQjtBQUl4QlEsMEJBQU0sS0FKa0I7QUFLeEJDLDhCQUFVO0FBTGMsaUJBQTVCLENBRFE7QUFEaUIsYUFBbkIsQ0FBZDs7QUFZQSxnQkFBSWQsUUFBUVosV0FBWixFQUF5QjtBQUNyQixzQkFBSzJCLE1BQUwsQ0FBZS9CLGdCQUFmO0FBQ0Esc0JBQUsrQixNQUFMLENBQWUvQixnQkFBZjtBQUNIO0FBbEMrQjtBQW1DbkM7O0FBRUQ7Ozs7Ozs7Ozs7QUE1RG9EO0FBQUE7QUFBQSxtQ0FvRTlDZ0MsS0FwRThDLEVBb0V2QztBQUNULG9CQUFJbkIsRUFBRW9CLFFBQUYsQ0FBV0QsS0FBWCxDQUFKLEVBQXVCQSxRQUFRLElBQUlmLEtBQUosQ0FBVWUsS0FBVixDQUFSOztBQUV2QixxQkFBS04sTUFBTCxDQUFZTSxLQUFaLENBQWtCQSxLQUFsQjs7QUFFQSxvQkFBSSxLQUFLaEIsT0FBTCxDQUFhWCxVQUFqQixFQUE2QixNQUFNMkIsS0FBTjtBQUNoQzs7QUFFRDs7Ozs7Ozs7QUE1RW9EO0FBQUE7OztBQTRGcEQ7Ozs7Ozs7Ozs7QUE1Rm9ELHdDQXNHakNoQixPQXRHaUMsRUFzR3hCO0FBQ3hCLG9CQUFJSCxFQUFFcUIsS0FBRixDQUFRLEtBQUtqQyxTQUFMLENBQVIsQ0FBSixFQUE4QjtBQUMxQix5QkFBS0EsU0FBTCxJQUFrQixJQUFJYSxNQUFKLENBQVdaLGlCQUFYLEVBQThCYyxPQUE5QixDQUFsQjtBQUNILGlCQUZELE1BRU87QUFDSEYsMkJBQU9xQixRQUFQLENBQWdCSCxLQUFoQixDQUFzQixtRkFBdEI7QUFDSDs7QUFFRCx1QkFBT2xCLE9BQU9xQixRQUFkO0FBQ0g7O0FBRUQ7Ozs7OztBQWhIb0Q7QUFBQTtBQUFBLDZDQXFINUI7QUFDcEIsdUJBQU8sS0FBS2xDLFNBQUwsQ0FBUDtBQUNIO0FBdkhtRDtBQUFBO0FBQUEsZ0NBbUY5QjtBQUNsQixvQkFBSVksRUFBRXFCLEtBQUYsQ0FBUSxLQUFLakMsU0FBTCxDQUFSLENBQUosRUFBOEI7QUFDMUIseUJBQUtBLFNBQUwsSUFBa0IsSUFBSWEsTUFBSixDQUFXWixpQkFBWCxDQUFsQjtBQUNIOztBQUVELHVCQUFPLEtBQUtELFNBQUwsQ0FBUDtBQUVIO0FBMUZtRDtBQUFBO0FBQUEsTUFzQm5DUSxVQXRCbUM7O0FBMEh4RCxXQUFPSyxNQUFQO0FBQ0gsQ0EzSEQiLCJmaWxlIjoiSlNXLUxvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgSlNXLUxvZ2dlci5qcyAtIExvZ2dpbmcgY2xhc3MgZXh0ZW5kaW5nIFdpbnN0b24gKEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS93aW5zdG9uanMvd2luc3RvbikgbW9kdWxlXG4gKiBAdmVyc2lvbiAwLjAuMVxuICogXG4gKiBAYXV0aG9yIEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAY29weXJpZ2h0IDIwMTYgRWR1YXJkbyBBc3RvbGZpIDxlYXN0b2xmaTkxQGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlZFxuICovXG5cbi8vIHZhciBwYXRoID0gcmVxdWlyZShcInBhdGhcIiksXG4vLyAgICAgZnMgPSByZXF1aXJlKCdmcy1leHRyYScpLFxuLy8gICAgIF8gPSByZXF1aXJlKFwibG9kYXNoXCIpLFxuLy8gICAgIHdpbnN0b24gPSByZXF1aXJlKFwid2luc3RvblwiKSxcbi8vICAgICB3aW5zdG9uTG9nZ2VyID0gd2luc3Rvbi5Mb2dnZXI7XG4gICAgXG5jb25zdCBUUkFOU1BPUlRfUFJFRklYID0gJ0VBTVBfTE9HR0VSJztcblxuLy8gU2luZ2xldG9uIGluc3RhbmNlXG5sZXQgc2luZ2xldG9uID0gU3ltYm9sKCk7XG5sZXQgc2luZ2xldG9uRW5mb3JjZXIgPSBTeW1ib2woKTtcblxubGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGhpZGVBbGxMb2dzOiBmYWxzZSxcbiAgICB0aHJvd0Vycm9yOiB0cnVlLFxuICAgIGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aDogJy8uLi9sb2dzL2hhbmRsZWRFeGNlcHRpb24ubG9nJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiYXNlTG9nZ2VyLCB3aW5zdG9uLCBwYXRoLCBmcywgXykge1xuXG4gICAgLyoqXG4gICAgICogTG9nZ2VyXG4gICAgICogXG4gICAgICogQG1vZHVsZSBMb2dnZXJcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAc2luY2UgMS4wLjBcbiAgICAgKiBcbiAgICAgKiBAY2xhc3NkZXNjIExvZ2dpbmcgbW9kdWxlIHNpbmdsZXRvbiB3aGljaCBpbmhlcml0cyB0aGUgV2luc3RvbiBMb2dnZXIgbW9kdWxlLlxuICAgICAqICAgICAgICAgIEJ5IGRlZmF1bHQ6IFxuICAgICAqICAgICAgICAgICAgICA8b2w+XG4gICAgICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGFsbCB0aGUgSEFORExFRCBleGNlcHRpb25zIHVuZGVyIGEgbG9nIGZpbGUgaW4gXCJsb2dzL2hhbmRsZWRFeGNlcHRpb24ubG9nXCI8L2xpPlxuICAgICAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBpbiB0aGUgY29uc29sZSBhbGwgd2FybmluZ3MgYW5kIGVycm9zPC9saT5cbiAgICAgKiAgICAgICAgICAgICAgPC9vbD5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N5bWJvbH0gZW5mb3JjZXIgLSBFbmZvcmNlciBpbnRlcm5hbCBvYmplY3QgdG8gYXZvaWQgaW5zdGFuY2lhdGluZyBhcyBcIm5ldyBMb2dnZXIoKVwiXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9uc1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBbb3B0aW9ucy5oaWRlQWxsTG9ncz1mYWxzZV0gLSBXaGVuIHNldCB0byB0cnVlIGhpZGVzIGFsbCBsb2dzICh1c2VmdWxsIHdoZW4gcnVubmluZyB0ZXN0cylcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gW29wdGlvbnMudGhyb3dFcnJvcj10cnVlXSAtIFdoZXRoZXIgaWYgdGhyb3cgYW4gZXhjZXB0aW9uIHdoZW4gbG9nZ2VkIHRyb3VnaHQgdGhlIExvZ2dlciN0aHJvdyBtZXRob2RcbiAgICAgKi9cbiAgICBjbGFzcyBMb2dnZXIgZXh0ZW5kcyBiYXNlTG9nZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoZW5mb3JjZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgICAgICAgaWYoZW5mb3JjZXIgIT0gc2luZ2xldG9uRW5mb3JjZXIpIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3Qgc2luZ2xldG9uXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzdXBlcih7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkNvbnNvbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogJ2Vycm9yJ1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmFzc2lnbih0aGlzLm9wdGlvbnMsIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRW5zdXJpbmcgdGhhdCB0aGUgbG9nIGZpbGUgZXhpc3RzXG4gICAgICAgICAgICBsZXQgaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSArIGRlZmF1bHRPcHRpb25zLmhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZzLmVuc3VyZUZpbGVTeW5jKGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbmV3IHdpbnN0b24uTG9nZ2VyKHtcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuRmlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBgJHtUUkFOU1BPUlRfUFJFRklYfV9leGNlcHRpb24tZmlsZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yaXplOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmhpZGVBbGxMb2dzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoYCR7VFJBTlNQT1JUX1BSRUZJWH1fZGVidWctY29uc29sZWApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGAke1RSQU5TUE9SVF9QUkVGSVh9X2V4Y2VwdGlvbi1maWxlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNZXRob2QgdG8gdGhyb3cgYSBjb250cm9sbGVkIGV4Y2VwdGlvbiwgbG9nZ2luZyBpdCB0byBhIGxvZyBmaWxlLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQG1ldGhvZCBMb2dnZXIjdGhyb3dcbiAgICAgICAgICogXG4gICAgICAgICAqIEBwYXJhbSB7RXJyb3J8U3RyaW5nfSBlcnJvciAtIFRoZSBleGNlcHRpb24gb3IgbWVzc2FnZSB0byBiZSB0aHJvd24uXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3Rocm93RXJyb3I9dHJ1ZV0gLSBTYW1lIGFzIExvZ2dlci0+b3B0aW9ucy0+dGhyb3dFcnJvclxuICAgICAgICAgKi9cbiAgICAgICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGVycm9yKSkgZXJyb3IgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMudGhyb3dFcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlLCBjcmVhdGluZyBhIG5ldyBvbmUgaWYgbmVlZGVkLlxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tzaW5nbGV0b25dID0gbmV3IExvZ2dlcihzaW5nbGV0b25FbmZvcmNlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0aGlzW3NpbmdsZXRvbl07XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuIFxuICAgICAgICAgKiBJdCBhbGxvd3MsIHdoZW4gY3JlYXRpbmcgdGhlIGZpcnN0IHRpbWUsIGEgc2V0IG9mIG9wdGlvbnMuIE90aGVyd2lzZSwgaXQgd2lsbCByZXR1cm4gdGhlIHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy4gU2VlIHtAbGluayBMb2dnZXIjY29uc3RydWN0b3J9XG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmVycm9yKFwiU2luZ2xldG9uIGFscmVhZHkgaW5zdGFuY2lhdGVkLiBJZ25vcmluZyBvcHRpb25zIGFuZCByZXRyaWV2aW5nIGN1cnJlbnQgaW5zdGFuY2UuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gTG9nZ2VyLmluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogRGVzdHJveSB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICAgICAgICogXG4gICAgICAgICAqIEBzdGF0aWNcbiAgICAgICAgICovXG4gICAgICAgIHN0YXRpYyBfX2Ryb3BJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzW3NpbmdsZXRvbl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIExvZ2dlcjtcbn07Il19
