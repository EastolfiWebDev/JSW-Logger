var expect = require('chai').expect,
    Logger = require('../lib/JSW-Logger.js');
    // Logger = require('../index.js');
    
// var logger = new winston.Logger({
//     transports: [
//         new winston.transports.Console({
//             name: 'debug-console',
//             level: 'debug'
//         // }),
//         // new (winston.transports.File)({
//         //     name: 'info-file',
//         //     level: 'info',
//         //     filename: 'logs/info.log'
//         // }),
//         // new (winston.transports.File)({
//         //     name: 'error-file',
//         //     level: 'error',
//         //     filename: 'logs/error.log'
//         })
//     ],
//     exceptionHandlers: [
//         new winston.transports.File({
//             name: 'exception-file',
//             filename: 'logs/exception.log',
//             humanReadableUnhandledException: true,
//             level: 'debug',
//             handleExceptions: true,
//             json: false,
//             colorize: true
//         })
//     ],
//     exitOnError: true
// });
  
//   var logger = new (winston.Logger)({
//     transports: [
//         new winston.transports.Console(
//             {
//                 level: 'debug',
//                 colorize: true,
//                 timestamp: true
//             }),
//         new winston.transports.File(
//             {
//                 level: 'info',
//                 colorize: false,
//                 timestamp: true,
//                 json: true,
//                 filename: '/logs/exception.log',
//                 handleExceptions: true
//             })
//     ]
// });

//   winston.handleExceptions(new winston.transports.File({ filename: 'logs/exception.log' }));

  
describe('Logger', function() {
    describe('#Constructor', function() {
        it('should have the dependencies ready', function() {
            expect(Logger).to.exist;
        });
    });
        
    describe('#Instance', function() {
        it('should be work only as a singleton', function() {
            var thrown = false;
            
            try {
                new Logger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
            
            thrown = false;
            try {
                Logger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it('should be able to create a first instance with options', function() {
            var logger = Logger.getInstance({ testing: true, hideAllLogs: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it('should be able to retrieve the instance', function() {
            var logger = Logger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it('should fail when re-instanciating with options', function() {
            var logger = Logger.getInstance({ testing: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it('should be able to drop the instance', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ testing: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(false);
        });
        
        it('should be able to create a first instance without options', function() {
            Logger.__dropInstance();
            
            var logger = Logger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
        });
    });
    
    describe('#Logging', function() {
        it('should output up to "info" by default', function() {
            Logger.__dropInstance();
            
            // Log up to info only
            var logger = Logger.getInstance({ hideAllLogs: true });
            
            var result = logger.silly('test info 1');
            
            expect(result).to.be.false;
            
            result = logger.info('test info 2');
            
            expect(result).to.be.equal('INFO: test info 2');
        });
        
        it('should not output if level is too low', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 2, hideAllLogs: true });
            
            var result = logger.silly('test silly 1');
            
            expect(result).to.be.false;
        });
        
        it('should output a "silly" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.silly('test silly 1');
            
            expect(result).to.be.equal('SILLY: test silly 1');
            
            result = logger.log('silly', 'test silly 2');
            
            expect(result).to.be.equal('SILLY: test silly 2');
            
            result = logger.log('6', 'test silly 3');
            
            expect(result).to.be.equal('SILLY: test silly 3');
            
            result = logger.log(6, 'test silly 4');
            
            expect(result).to.be.equal('SILLY: test silly 4');
        });
        
        it('should output a "debug" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.debug('test debug 1');
            
            expect(result).to.be.equal('DEBUG: test debug 1');
            
            result = logger.log('debug', 'test debug 2');
            
            expect(result).to.be.equal('DEBUG: test debug 2');
        });
        
        it('should output a "verbose" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.verbose('test verbose 1');
            
            expect(result).to.be.equal('VERBOSE: test verbose 1');
            
            result = logger.log('verbose', 'test verbose 2');
            
            expect(result).to.be.equal('VERBOSE: test verbose 2');
        });
        
        it('should output a "info" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.info('test info 1');
            
            expect(result).to.be.equal('INFO: test info 1');
            
            result = logger.inform('test info 2');
            
            expect(result).to.be.equal('INFO: test info 2');
            
            result = logger.information('test info 3');
            
            expect(result).to.be.equal('INFO: test info 3');
            
            result = logger.log('info', 'test info 4');
            
            expect(result).to.be.equal('INFO: test info 4');
        });
        
        it('should output a "warn" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.warn('test warn 1');
            
            expect(result).to.be.equal('WARN: test warn 1');
            
            result = logger.warning('test warn 2');
            
            expect(result).to.be.equal('WARN: test warn 2');
            
            result = logger.log('warn', 'test warn 3');
            
            expect(result).to.be.equal('WARN: test warn 3');
        });
        
        it('should output a "error" log', function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.error('error debug 1');
            
            expect(result).to.be.equal('ERROR: error debug 1');
            
            result = logger.log('error', 'error debug 2');
            
            expect(result).to.be.equal('ERROR: error debug 2');
        });
        
        it('should throw an error and exit', function() {
            var logger = Logger.instance;
            
            var thrown = false;
            
            try {
                logger.throw('TEST');
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.be.equal('TEST');
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it('should throw an error without exiting', function() {
            var logger = Logger.instance;
            logger.options.throwError = false;
            
            var thrown = false;
            
            try {
                logger.throw('TEST');
            } catch (error) {
                thrown = true;
            } finally {
                expect(thrown).to.be.false;
            }
        });
    });
});