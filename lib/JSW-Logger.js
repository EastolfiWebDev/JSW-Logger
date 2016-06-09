"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var TRANSPORT_PREFIX = 'EAMP_LOGGER_';

// Singleton instance
var singleton = Symbol();
var singletonEnforcer = Symbol();

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
    _inherits(Logger, _winstonLogger);

    function Logger(enforcer) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Logger);

        if (enforcer != singletonEnforcer) throw new Error("Cannot construct singleton");

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Logger).call(this, {
            transports: [new winston.transports.Console({
                name: TRANSPORT_PREFIX + 'debug-console',
                level: 'error'
            })]
        }));

        _this.options = _.assign(_this.options, defaultOptions, options);

        // Ensuring that the log file exists
        fs.ensureFileSync(path.resolve(__dirname + defaultOptions.handledExceptionsLogPath));

        _this.logger = new winston.Logger({
            transports: [new winston.transports.File({
                name: TRANSPORT_PREFIX + 'exception-file',
                filename: 'logs/handledException.log',
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


    _createClass(Logger, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9KU1ctTG9nZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFJLE9BQU8sUUFBUSxNQUFSLENBQVg7SUFDSSxLQUFLLFFBQVEsVUFBUixDQURUO0lBRUksSUFBSSxRQUFRLFFBQVIsQ0FGUjtJQUdJLFVBQVUsUUFBUSxTQUFSLENBSGQ7SUFJSSxnQkFBZ0IsUUFBUSxNQUo1Qjs7QUFNQSxJQUFNLG1CQUFtQixjQUF6Qjs7O0FBR0EsSUFBSSxZQUFZLFFBQWhCO0FBQ0EsSUFBSSxvQkFBb0IsUUFBeEI7O0FBRUEsSUFBSSxpQkFBaUI7QUFDakIsZ0JBQVksSUFESztBQUVqQiw4QkFBMEI7QUFGVCxDQUFyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdCTSxNOzs7QUFDRixvQkFBWSxRQUFaLEVBQW9DO0FBQUEsWUFBZCxPQUFjLHlEQUFKLEVBQUk7O0FBQUE7O0FBQ2hDLFlBQUcsWUFBWSxpQkFBZixFQUFrQyxNQUFNLElBQUksS0FBSixDQUFVLDRCQUFWLENBQU47O0FBREYsOEZBRzFCO0FBQ0Ysd0JBQVksQ0FDUixJQUFJLFFBQVEsVUFBUixDQUFtQixPQUF2QixDQUErQjtBQUMzQixzQkFBTSxtQkFBbUIsZUFERTtBQUUzQix1QkFBTztBQUZvQixhQUEvQixDQURRO0FBRFYsU0FIMEI7O0FBWWhDLGNBQUssT0FBTCxHQUFlLEVBQUUsTUFBRixDQUFTLE1BQUssT0FBZCxFQUF1QixjQUF2QixFQUF1QyxPQUF2QyxDQUFmOzs7QUFHQSxXQUFHLGNBQUgsQ0FBa0IsS0FBSyxPQUFMLENBQWEsWUFBWSxlQUFlLHdCQUF4QyxDQUFsQjs7QUFFQSxjQUFLLE1BQUwsR0FBYyxJQUFJLFFBQVEsTUFBWixDQUFtQjtBQUM3Qix3QkFBWSxDQUNSLElBQUksUUFBUSxVQUFSLENBQW1CLElBQXZCLENBQTRCO0FBQ3hCLHNCQUFNLG1CQUFtQixnQkFERDtBQUV4QiwwQkFBVSwyQkFGYztBQUd4Qix1QkFBTyxPQUhpQjtBQUl4QixzQkFBTSxLQUprQjtBQUt4QiwwQkFBVTtBQUxjLGFBQTVCLENBRFE7QUFEaUIsU0FBbkIsQ0FBZDtBQWpCZ0M7QUE0Qm5DOzs7Ozs7Ozs7Ozs7OzsrQkFVSyxLLEVBQU87QUFDVCxnQkFBSSxFQUFFLFFBQUYsQ0FBVyxLQUFYLENBQUosRUFBdUIsUUFBUSxJQUFJLEtBQUosQ0FBVSxLQUFWLENBQVI7O0FBRXZCLGlCQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCOztBQUVBLGdCQUFJLEtBQUssT0FBTCxDQUFhLFVBQWpCLEVBQTZCLE1BQU0sS0FBTjtBQUNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQTRCa0IsTyxFQUFTO0FBQ3hCLGdCQUFJLEVBQUUsS0FBRixDQUFRLEtBQUssU0FBTCxDQUFSLENBQUosRUFBOEI7QUFDMUIscUJBQUssU0FBTCxJQUFrQixJQUFJLE1BQUosQ0FBVyxpQkFBWCxFQUE4QixPQUE5QixDQUFsQjtBQUNILGFBRkQsTUFFTztBQUNILHdCQUFRLEtBQVIsQ0FBYyxtRkFBZDtBQUNIOztBQUVELG1CQUFPLE9BQU8sUUFBZDtBQUNIOzs7Ozs7Ozs7O3lDQU91QjtBQUNwQixtQkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUNIOzs7NEJBcENxQjtBQUNsQixnQkFBSSxFQUFFLEtBQUYsQ0FBUSxLQUFLLFNBQUwsQ0FBUixDQUFKLEVBQThCO0FBQzFCLHFCQUFLLFNBQUwsSUFBa0IsSUFBSSxNQUFKLENBQVcsaUJBQVgsQ0FBbEI7QUFDSDs7QUFFRCxtQkFBTyxLQUFLLFNBQUwsQ0FBUDtBQUVIOzs7O0VBN0RnQixhOztBQTZGckIsT0FBTyxPQUFQLEdBQWlCLE1BQWpCIiwiZmlsZSI6IkpTVy1Mb2dnZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEpTVy1Mb2dnZXIuanMgLSBMb2dnaW5nIGNsYXNzIGV4dGVuZGluZyBXaW5zdG9uIChAbGluayBodHRwczovL2dpdGh1Yi5jb20vd2luc3RvbmpzL3dpbnN0b24pIG1vZHVsZVxuICogQHZlcnNpb24gMC4wLjFcbiAqIFxuICogQGF1dGhvciBFZHVhcmRvIEFzdG9sZmkgPGVhc3RvbGZpOTFAZ21haWwuY29tPlxuICogQGNvcHlyaWdodCAyMDE2IEVkdWFyZG8gQXN0b2xmaSA8ZWFzdG9sZmk5MUBnbWFpbC5jb20+XG4gKiBAbGljZW5zZSBNSVQgTGljZW5zZWRcbiAqL1xuXG52YXIgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpLFxuICAgIGZzID0gcmVxdWlyZSgnZnMtZXh0cmEnKSxcbiAgICBfID0gcmVxdWlyZShcImxvZGFzaFwiKSxcbiAgICB3aW5zdG9uID0gcmVxdWlyZShcIndpbnN0b25cIiksXG4gICAgd2luc3RvbkxvZ2dlciA9IHdpbnN0b24uTG9nZ2VyO1xuICAgIFxuY29uc3QgVFJBTlNQT1JUX1BSRUZJWCA9ICdFQU1QX0xPR0dFUl8nO1xuXG4vLyBTaW5nbGV0b24gaW5zdGFuY2VcbmxldCBzaW5nbGV0b24gPSBTeW1ib2woKTtcbmxldCBzaW5nbGV0b25FbmZvcmNlciA9IFN5bWJvbCgpO1xuXG5sZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgdGhyb3dFcnJvcjogdHJ1ZSxcbiAgICBoYW5kbGVkRXhjZXB0aW9uc0xvZ1BhdGg6ICcvLi4vbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZydcbn07XG5cbi8qKlxuICogTG9nZ2VyXG4gKiBcbiAqIEBtb2R1bGUgTG9nZ2VyXG4gKiBAY29uc3RydWN0b3JcbiAqIEBzaW5jZSAxLjAuMFxuICogXG4gKiBAY2xhc3NkZXNjIExvZ2dpbmcgbW9kdWxlIHNpbmdsZXRvbiB3aGljaCBpbmhlcml0cyB0aGUgV2luc3RvbiBMb2dnZXIgbW9kdWxlLlxuICogICAgICAgICAgQnkgZGVmYXVsdDogXG4gKiAgICAgICAgICAgICAgPG9sPlxuICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGFsbCB0aGUgSEFORExFRCBleGNlcHRpb25zIHVuZGVyIGEgbG9nIGZpbGUgaW4gXCJsb2dzL2hhbmRsZWRFeGNlcHRpb24ubG9nXCI8L2xpPlxuICogICAgICAgICAgICAgICAgICA8bGk+V3JpdGVzIGluIHRoZSBjb25zb2xlIGFsbCB3YXJuaW5ncyBhbmQgZXJyb3M8L2xpPlxuICogICAgICAgICAgICAgIDwvb2w+XG4gKiBcbiAqIEBwYXJhbSB7U3ltYm9sfSBlbmZvcmNlciAtIEVuZm9yY2VyIGludGVybmFsIG9iamVjdCB0byBhdm9pZCBpbnN0YW5jaWF0aW5nIGFzIFwibmV3IExvZ2dlcigpXCJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAqIFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IFtvcHRpb25zLnRocm93RXJyb3I9dHJ1ZV0gLSBXaGV0aGVyIGlmIHRocm93IGFuIGV4Y2VwdGlvbiB3aGVuIGxvZ2dlZCB0cm91Z2h0IHRoZSBMb2dnZXIjdGhyb3cgbWV0aG9kXG4gKi9cbmNsYXNzIExvZ2dlciBleHRlbmRzIHdpbnN0b25Mb2dnZXIge1xuICAgIGNvbnN0cnVjdG9yKGVuZm9yY2VyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYoZW5mb3JjZXIgIT0gc2luZ2xldG9uRW5mb3JjZXIpIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBjb25zdHJ1Y3Qgc2luZ2xldG9uXCIpO1xuICAgICAgICBcbiAgICAgICAgc3VwZXIoe1xuICAgICAgICAgICAgdHJhbnNwb3J0czogW1xuICAgICAgICAgICAgICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFRSQU5TUE9SVF9QUkVGSVggKyAnZGVidWctY29uc29sZScsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmFzc2lnbih0aGlzLm9wdGlvbnMsIGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEVuc3VyaW5nIHRoYXQgdGhlIGxvZyBmaWxlIGV4aXN0c1xuICAgICAgICBmcy5lbnN1cmVGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lICsgZGVmYXVsdE9wdGlvbnMuaGFuZGxlZEV4Y2VwdGlvbnNMb2dQYXRoKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlciA9IG5ldyB3aW5zdG9uLkxvZ2dlcih7XG4gICAgICAgICAgICB0cmFuc3BvcnRzOiBbXG4gICAgICAgICAgICAgICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5GaWxlKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogVFJBTlNQT1JUX1BSRUZJWCArICdleGNlcHRpb24tZmlsZScsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiAnbG9ncy9oYW5kbGVkRXhjZXB0aW9uLmxvZycsXG4gICAgICAgICAgICAgICAgICAgIGxldmVsOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICBqc29uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JpemU6IHRydWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIHRocm93IGEgY29udHJvbGxlZCBleGNlcHRpb24sIGxvZ2dpbmcgaXQgdG8gYSBsb2cgZmlsZS5cbiAgICAgKiBcbiAgICAgKiBAbWV0aG9kIExvZ2dlciN0aHJvd1xuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RXJyb3J8U3RyaW5nfSBlcnJvciAtIFRoZSBleGNlcHRpb24gb3IgbWVzc2FnZSB0byBiZSB0aHJvd24uXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbdGhyb3dFcnJvcj10cnVlXSAtIFNhbWUgYXMgTG9nZ2VyLT5vcHRpb25zLT50aHJvd0Vycm9yXG4gICAgICovXG4gICAgdGhyb3coZXJyb3IpIHtcbiAgICAgICAgaWYgKF8uaXNTdHJpbmcoZXJyb3IpKSBlcnJvciA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRocm93RXJyb3IpIHRocm93IGVycm9yO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlLCBjcmVhdGluZyBhIG5ldyBvbmUgaWYgbmVlZGVkLlxuICAgICAqIFxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyB7TG9nZ2VyfSB0aGlzIC0gVGhlIHNpbmdsZXRvbiBJbnN0YW5jZVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XG4gICAgICAgIGlmIChfLmlzTmlsKHRoaXNbc2luZ2xldG9uXSkpIHtcbiAgICAgICAgICAgIHRoaXNbc2luZ2xldG9uXSA9IG5ldyBMb2dnZXIoc2luZ2xldG9uRW5mb3JjZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1tzaW5nbGV0b25dO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogUmV0cmlldmVzIHRoZSBjdXJyZW50IHNpbmdsZXRvbiBpbnN0YW5jZSwgY3JlYXRpbmcgYSBuZXcgb25lIGlmIG5lZWRlZC4gXG4gICAgICogSXQgYWxsb3dzLCB3aGVuIGNyZWF0aW5nIHRoZSBmaXJzdCB0aW1lLCBhIHNldCBvZiBvcHRpb25zLiBPdGhlcndpc2UsIGl0IHdpbGwgcmV0dXJuIHRoZSBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICAgKiBcbiAgICAgKiBAc3RhdGljXG4gICAgICogXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIEFkZGl0aW9uYWwgb3B0aW9ucy4gU2VlIHtAbGluayBMb2dnZXIjY29uc3RydWN0b3J9XG4gICAgICogXG4gICAgICogQHJldHVybnMge0xvZ2dlcn0gdGhpcyAtIFRoZSBzaW5nbGV0b24gSW5zdGFuY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2Uob3B0aW9ucykge1xuICAgICAgICBpZiAoXy5pc05pbCh0aGlzW3NpbmdsZXRvbl0pKSB7XG4gICAgICAgICAgICB0aGlzW3NpbmdsZXRvbl0gPSBuZXcgTG9nZ2VyKHNpbmdsZXRvbkVuZm9yY2VyLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJTaW5nbGV0b24gYWxyZWFkeSBpbnN0YW5jaWF0ZWQuIElnbm9yaW5nIG9wdGlvbnMgYW5kIHJldHJpZXZpbmcgY3VycmVudCBpbnN0YW5jZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBMb2dnZXIuaW5zdGFuY2U7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgc2luZ2xldG9uIGluc3RhbmNlXG4gICAgICogXG4gICAgICogQHN0YXRpY1xuICAgICAqL1xuICAgIHN0YXRpYyBfX2Ryb3BJbnN0YW5jZSgpIHtcbiAgICAgICAgZGVsZXRlIHRoaXNbc2luZ2xldG9uXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTG9nZ2VyOyJdfQ==
