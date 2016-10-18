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
                _this.logger.remove(TRANSPORT_PREFIX + '_exception-file');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpTVy1Mb2dnZXIuanMiXSwibmFtZXMiOlsiVFJBTlNQT1JUX1BSRUZJWCIsInNpbmdsZXRvbiIsInNpbmdsZXRvbkVuZm9yY2VyIiwiZGVmYXVsdE9wdGlvbnMiLCJoaWRlQWxsTG9ncyIsInRocm93RXJyb3IiLCJoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgiLCJtb2R1bGUiLCJleHBvcnRzIiwiYmFzZUxvZ2dlciIsIndpbnN0b24iLCJwYXRoIiwiZnMiLCJfIiwiTG9nZ2VyIiwiZW5mb3JjZXIiLCJvcHRpb25zIiwiRXJyb3IiLCJ0cmFuc3BvcnRzIiwiQ29uc29sZSIsIm5hbWUiLCJsZXZlbCIsImFzc2lnbiIsInJlc29sdmUiLCJfX2Rpcm5hbWUiLCJlbnN1cmVGaWxlU3luYyIsImxvZ2dlciIsIkZpbGUiLCJmaWxlbmFtZSIsImpzb24iLCJjb2xvcml6ZSIsInJlbW92ZSIsImVycm9yIiwiaXNTdHJpbmciLCJpc05pbCIsImluc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsbUJBQW1CLGFBQXpCOztBQUVBO0FBQ0EsSUFBSUMsWUFBWSx1QkFBaEI7QUFDQSxJQUFJQyxvQkFBb0IsdUJBQXhCOztBQUVBLElBQUlDLGlCQUFpQjtBQUNqQkMsaUJBQWEsS0FESTtBQUVqQkMsZ0JBQVksSUFGSztBQUdqQkMsOEJBQTBCO0FBSFQsQ0FBckI7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUIsVUFBU0MsVUFBVCxFQUFxQkMsT0FBckIsRUFBOEJDLElBQTlCLEVBQW9DQyxFQUFwQyxFQUF3Q0MsQ0FBeEMsRUFBMkM7O0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZ3RCxRQXNCbERDLE1BdEJrRDtBQUFBOztBQXVCcEQsd0JBQVlDLFFBQVosRUFBb0M7QUFBQSxnQkFBZEMsT0FBYyx5REFBSixFQUFJO0FBQUE7O0FBQ2hDLGdCQUFHRCxZQUFZYixpQkFBZixFQUFrQyxNQUFNLElBQUllLEtBQUosQ0FBVSw0QkFBVixDQUFOOztBQURGLHdIQUcxQjtBQUNGQyw0QkFBWSxDQUNSLElBQUlSLFFBQVFRLFVBQVIsQ0FBbUJDLE9BQXZCLENBQStCO0FBQzNCQywwQkFBU3BCLGdCQUFULG1CQUQyQjtBQUUzQnFCLDJCQUFPO0FBRm9CLGlCQUEvQixDQURRO0FBRFYsYUFIMEI7O0FBWWhDLGtCQUFLTCxPQUFMLEdBQWVILEVBQUVTLE1BQUYsQ0FBUyxNQUFLTixPQUFkLEVBQXVCYixjQUF2QixFQUF1Q2EsT0FBdkMsQ0FBZjs7QUFFQTtBQUNBLGdCQUFJViwyQkFBMkJLLEtBQUtZLE9BQUwsQ0FBYUMsWUFBWXJCLGVBQWVHLHdCQUF4QyxDQUEvQjs7QUFFQU0sZUFBR2EsY0FBSCxDQUFrQm5CLHdCQUFsQjs7QUFFQSxrQkFBS29CLE1BQUwsR0FBYyxJQUFJaEIsUUFBUUksTUFBWixDQUFtQjtBQUM3QkksNEJBQVksQ0FDUixJQUFJUixRQUFRUSxVQUFSLENBQW1CUyxJQUF2QixDQUE0QjtBQUN4QlAsMEJBQVNwQixnQkFBVCxvQkFEd0I7QUFFeEI0Qiw4QkFBVXRCLHdCQUZjO0FBR3hCZSwyQkFBTyxPQUhpQjtBQUl4QlEsMEJBQU0sS0FKa0I7QUFLeEJDLDhCQUFVO0FBTGMsaUJBQTVCLENBRFE7QUFEaUIsYUFBbkIsQ0FBZDs7QUFZQSxnQkFBSWQsUUFBUVosV0FBWixFQUF5QjtBQUNyQixzQkFBSzJCLE1BQUwsQ0FBZS9CLGdCQUFmO0FBQ0Esc0JBQUswQixNQUFMLENBQVlLLE1BQVosQ0FBc0IvQixnQkFBdEI7QUFDSDtBQWxDK0I7QUFtQ25DOztBQUVEOzs7Ozs7Ozs7O0FBNURvRDtBQUFBO0FBQUEsbUNBb0U5Q2dDLEtBcEU4QyxFQW9FdkM7QUFDVCxvQkFBSW5CLEVBQUVvQixRQUFGLENBQVdELEtBQVgsQ0FBSixFQUF1QkEsUUFBUSxJQUFJZixLQUFKLENBQVVlLEtBQVYsQ0FBUjs7QUFFdkIscUJBQUtOLE1BQUwsQ0FBWU0sS0FBWixDQUFrQkEsS0FBbEI7O0FBRUEsb0JBQUksS0FBS2hCLE9BQUwsQ0FBYVgsVUFBakIsRUFBNkIsTUFBTTJCLEtBQU47QUFDaEM7O0FBRUQ7Ozs7Ozs7O0FBNUVvRDtBQUFBOzs7QUE0RnBEOzs7Ozs7Ozs7O0FBNUZvRCx3Q0FzR2pDaEIsT0F0R2lDLEVBc0d4QjtBQUN4QixvQkFBSUgsRUFBRXFCLEtBQUYsQ0FBUSxLQUFLakMsU0FBTCxDQUFSLENBQUosRUFBOEI7QUFDMUIseUJBQUtBLFNBQUwsSUFBa0IsSUFBSWEsTUFBSixDQUFXWixpQkFBWCxFQUE4QmMsT0FBOUIsQ0FBbEI7QUFDSCxpQkFGRCxNQUVPO0FBQ0hGLDJCQUFPcUIsUUFBUCxDQUFnQkgsS0FBaEIsQ0FBc0IsbUZBQXRCO0FBQ0g7O0FBRUQsdUJBQU9sQixPQUFPcUIsUUFBZDtBQUNIOztBQUVEOzs7Ozs7QUFoSG9EO0FBQUE7QUFBQSw2Q0FxSDVCO0FBQ3BCLHVCQUFPLEtBQUtsQyxTQUFMLENBQVA7QUFDSDtBQXZIbUQ7QUFBQTtBQUFBLGdDQW1GOUI7QUFDbEIsb0JBQUlZLEVBQUVxQixLQUFGLENBQVEsS0FBS2pDLFNBQUwsQ0FBUixDQUFKLEVBQThCO0FBQzFCLHlCQUFLQSxTQUFMLElBQWtCLElBQUlhLE1BQUosQ0FBV1osaUJBQVgsQ0FBbEI7QUFDSDs7QUFFRCx1QkFBTyxLQUFLRCxTQUFMLENBQVA7QUFFSDtBQTFGbUQ7QUFBQTtBQUFBLE1Bc0JuQ1EsVUF0Qm1DOztBQTBIeEQsV0FBT0ssTUFBUDtBQUNILENBM0hEIiwiZmlsZSI6IkpTVy1Mb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEpTVy1Mb2dnZXIuanMgLSBMb2dnaW5nIGNsYXNzIGV4dGVuZGluZyBXaW5zdG9uIChAbGluayBodHRwczovL2dpdGh1Yi5jb20vd2luc3RvbmpzL3dpbnN0b24pIG1vZHVsZVxuICogQHZlcnNpb24gMC4wLjFcbiAqIFxuICogQGF1dGhvciBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2IEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZWRcbiAqL1xuXG4vLyB2YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpLFxuLy8gICAgIGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKSxcbi8vICAgICBfID0gcmVxdWlyZShcImxvZGFzaFwiKSxcbi8vICAgICB3aW5zdG9uID0gcmVxdWlyZShcIndpbnN0b25cIiksXG4vLyAgICAgd2luc3RvbkxvZ2dlciA9IHdpbnN0b24uTG9nZ2VyO1xuICAgIFxuY29uc3QgVFJBTlNQT1JUX1BSRUZJWCA9ICdFQU1QX0xPR0dFUic7XG5cbi8vIFNpbmdsZXRvbiBpbnN0YW5jZVxubGV0IHNpbmdsZXRvbiA9IFN5bWJvbCgpO1xubGV0IHNpbmdsZXRvbkVuZm9yY2VyID0gU3ltYm9sKCk7XG5cbmxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBoaWRlQWxsTG9nczogZmFsc2UsXG4gICAgdGhyb3dFcnJvcjogdHJ1ZSxcbiAgICBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGg6ICcvLi4vbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYmFzZUxvZ2dlciwgd2luc3RvbiwgcGF0aCwgZnMsIF8pIHtcblxuICAgIC8qKlxuICAgICAqIExvZ2dlclxuICAgICAqIFxuICAgICAqIEBtb2R1bGUgTG9nZ2VyXG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICogQHNpbmNlIDEuMC4wXG4gICAgICogXG4gICAgICogQGNsYXNzZGVzYyBMb2dnaW5nIG1vZHVsZSBzaW5nbGV0b24gd2hpY2ggaW5oZXJpdHMgdGhlIFdpbnN0b24gTG9nZ2VyIG1vZHVsZS5cbiAgICAgKiAgICAgICAgICBCeSBkZWZhdWx0OiBcbiAgICAgKiAgICAgICAgICAgICAgPG9sPlxuICAgICAqICAgICAgICAgICAgICAgICAgPGxpPldyaXRlcyBhbGwgdGhlIEhBTkRMRUQgZXhjZXB0aW9ucyB1bmRlciBhIGxvZyBmaWxlIGluIFwibG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZ1wiPC9saT5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxsaT5Xcml0ZXMgaW4gdGhlIGNvbnNvbGUgYWxsIHdhcm5pbmdzIGFuZCBlcnJvczwvbGk+XG4gICAgICogICAgICAgICAgICAgIDwvb2w+XG4gICAgICogXG4gICAgICogQHBhcmFtIHtTeW1ib2x9IGVuZm9yY2VyIC0gRW5mb3JjZXIgaW50ZXJuYWwgb2JqZWN0IHRvIGF2b2lkIGluc3RhbmNpYXRpbmcgYXMgXCJuZXcgTG9nZ2VyKClcIlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gW29wdGlvbnMuaGlkZUFsbExvZ3M9ZmFsc2VdIC0gV2hlbiBzZXQgdG8gdHJ1ZSBoaWRlcyBhbGwgbG9ncyAodXNlZnVsbCB3aGVuIHJ1bm5pbmcgdGVzdHMpXG4gICAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IFtvcHRpb25zLnRocm93RXJyb3I9dHJ1ZV0gLSBXaGV0aGVyIGlmIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGxvZ2dlZCB0cm91Z2h0IHRoZSBMb2dnZXIjdGhyb3cgbWV0aG9kXG4gICAgICovXG4gICAgY2xhc3MgTG9nZ2VyIGV4dGVuZHMgYmFzZUxvZ2dlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGVuZm9yY2VyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgIGlmKGVuZm9yY2VyICE9IHNpbmdsZXRvbkVuZm9yY2VyKSB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgY29uc3RydWN0IHNpbmdsZXRvblwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgICAgIHRyYW5zcG9ydHM6IFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6ICdlcnJvcidcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gXy5hc3NpZ24odGhpcy5vcHRpb25zLCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICAgICAgbGV0IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUgKyBkZWZhdWx0T3B0aW9ucy5oYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyhoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgICAgICBuZXcgd2luc3Rvbi50cmFuc3BvcnRzLkZpbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZW5hbWU6IGhhbmRsZWRFeGNlcHRpb25zTG9nUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAganNvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcml6ZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5oaWRlQWxsTG9ncykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGAke1RSQU5TUE9SVF9QUkVGSVh9X2RlYnVnLWNvbnNvbGVgKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlci5yZW1vdmUoYCR7VFJBTlNQT1JUX1BSRUZJWH1fZXhjZXB0aW9uLWZpbGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1ldGhvZCB0byB0aHJvdyBhIGNvbnRyb2xsZWQgZXhjZXB0aW9uLCBsb2dnaW5nIGl0IHRvIGEgbG9nIGZpbGUuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAbWV0aG9kIExvZ2dlciN0aHJvd1xuICAgICAgICAgKiBcbiAgICAgICAgICogQHBhcmFtIHtFcnJvcnxTdHJpbmd9IGVycm9yIC0gVGhlIGV4Y2VwdGlvbiBvciBtZXNzYWdlIHRvIGJlIHRocm93bi5cbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBbdGhyb3dFcnJvcj10cnVlXSAtIFNhbWUgYXMgTG9nZ2VyLT5vcHRpb25zLT50aHJvd0Vycm9yXG4gICAgICAgICAqL1xuICAgICAgICB0aHJvdyhlcnJvcikge1xuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoZXJyb3IpKSBlcnJvciA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50aHJvd0Vycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHJpZXZlcyB0aGUgY3VycmVudCBzaW5nbGV0b24gaW5zdGFuY2UsIGNyZWF0aW5nIGEgbmV3IG9uZSBpZiBuZWVkZWQuXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIGdldCBpbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC4gXG4gICAgICAgICAqIEl0IGFsbG93cywgd2hlbiBjcmVhdGluZyB0aGUgZmlyc3QgdGltZSwgYSBzZXQgb2Ygb3B0aW9ucy4gT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAc3RhdGljXG4gICAgICAgICAqIFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gQWRkaXRpb25hbCBvcHRpb25zLiBTZWUge0BsaW5rIExvZ2dlciNjb25zdHJ1Y3Rvcn1cbiAgICAgICAgICogXG4gICAgICAgICAqIEByZXR1cm5zIHtMb2dnZXJ9IHRoaXMgLSBUaGUgc2luZ2xldG9uIEluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKF8uaXNOaWwodGhpc1tzaW5nbGV0b25dKSkge1xuICAgICAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuZXJyb3IoXCJTaW5nbGV0b24gYWxyZWFkeSBpbnN0YW5jaWF0ZWQuIElnbm9yaW5nIG9wdGlvbnMgYW5kIHJldHJpZXZpbmcgY3VycmVudCBpbnN0YW5jZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBMb2dnZXIuaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZVxuICAgICAgICAgKiBcbiAgICAgICAgICogQHN0YXRpY1xuICAgICAgICAgKi9cbiAgICAgICAgc3RhdGljIF9fZHJvcEluc3RhbmNlKCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbc2luZ2xldG9uXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gTG9nZ2VyO1xufTsiXX0=
