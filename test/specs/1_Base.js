var expect = null,
    JSWLogger = null;

var browser = false;

try {
    if (window) browser = true;
} catch (e) {}

if (browser) {
    expect = window.chai.expect;
    JSWLogger = window.Logger;
} else {
    expect = require('chai').expect;
    JSWLogger = require('../../lib/JSW-Logger.js');
}

describe('Logger' + (browser ? "- Web" : ""), function() {
    describe('#Constructor', function() {
        it('should have the dependencies ready', function() {
            expect(JSWLogger).to.exist;
        });
    });
        
    describe('#Instance', function() {
        it('should be work only as a singleton', function() {
            var thrown = false;
            
            try {
                new JSWLogger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
            
            thrown = false;
            try {
                JSWLogger();
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it('should be able to create a first instance with options', function() {
            var logger = JSWLogger.getInstance({ testing: true, hideAllLogs: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it('should be able to retrieve the instance', function() {
            var logger = JSWLogger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it('should fail when re-instanciating with options', function() {
            var logger = JSWLogger.getInstance({ hideAllLogs: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
            expect(logger.options).to.have.ownProperty("hideAllLogs", true);
        });
        
        it('should be able to drop the instance', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ hideLevelLog: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
            expect(logger.options).to.have.ownProperty("hideAllLogs", false);
            expect(logger.options).to.have.ownProperty("hideLevelLog", true);
        });
        
        it('should be able to create a first instance without options', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
        });
    });
    
    describe('#Logging', function() {
        it('should work even with no arguments', function() {
            JSWLogger.__dropInstance();
            
            // Log up to info only
            var logger = JSWLogger.getInstance({ level: 9, hideLevelLog: true });
            
            var result = logger.silly();
            
            expect(result).to.be.equal('');
        });
        
        it('should output up to "info" by default', function() {
            JSWLogger.__dropInstance();
            
            // Log up to info only
            var logger = JSWLogger.getInstance({ hideAllLogs: true });
            
            var result = logger.silly('test info 1');
            
            expect(result).to.be.false;
            
            result = logger.info('test info 2');
            
            expect(result).to.be.equal('INFO: test info 2');
        });
        
        it('should not output if level is too low', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 2, hideAllLogs: true });
            
            var result = logger.silly('test silly 1');
            
            expect(result).to.be.false;
        });
        
        it('should output a "silly" log', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
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
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.debug('test debug 1');
            
            expect(result).to.be.equal('DEBUG: test debug 1');
            
            result = logger.log('debug', 'test debug 2');
            
            expect(result).to.be.equal('DEBUG: test debug 2');
        });
        
        it('should output a "verbose" log', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.verbose('test verbose 1');
            
            expect(result).to.be.equal('VERBOSE: test verbose 1');
            
            result = logger.log('verbose', 'test verbose 2');
            
            expect(result).to.be.equal('VERBOSE: test verbose 2');
        });
        
        it('should output a "info" log', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
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
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.warn('test warn 1');
            
            expect(result).to.be.equal('WARN: test warn 1');
            
            result = logger.warning('test warn 2');
            
            expect(result).to.be.equal('WARN: test warn 2');
            
            result = logger.log('warn', 'test warn 3');
            
            expect(result).to.be.equal('WARN: test warn 3');
        });
        
        it('should output a "error" log', function() {
            JSWLogger.__dropInstance();
            
            var logger = JSWLogger.getInstance({ level: 9, hideAllLogs: true });
            
            var result = logger.error('error debug 1');
            
            expect(result).to.be.equal('ERROR: error debug 1');
            
            result = logger.log('error', 'error debug 2');
            
            expect(result).to.be.equal('ERROR: error debug 2');
        });
        
        it('should throw an error and exit', function() {
            var logger = JSWLogger.instance;
            
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
            var logger = JSWLogger.instance;
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