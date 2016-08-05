/* global chai, _ */

var expect = chai.expect;

var Logger = null;

describe("Logger - Web", function() {
    describe("#Constructor", function() {
        it("should have the dependencies ready", function() {
            expect(require).to.exist;
            expect(_).to.exist;
            
            Logger = require("jsw-logger");
            
            expect(Logger).to.exist;
        });
    });
        
    describe("#Instance", function() {
        it("should be work only as a singleton", function() {
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
        
        it("should be able to create a first instance with options", function() {
            var logger = Logger.getInstance({ testing: true });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it("should be able to retrieve the instance", function() {
            var logger = Logger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it("should fail when re-instanciating with options", function() {
            var logger = Logger.getInstance({ testing: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(true);
        });
        
        it("should be able to drop the instance", function() {
            Logger.__dropInstance();
            
            var logger = Logger.getInstance({ testing: false });
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.have.ownProperty('testing');
            expect(logger.options.testing).to.be.equal(false);
        });
        
        it("should be able to create a first instance without options", function() {
            Logger.__dropInstance();
            
            var logger = Logger.instance;
            
            expect(logger).to.exist;
            
            expect(logger).to.have.ownProperty('options');
            expect(logger.options).to.not.have.ownProperty('testing');
        });
    });
    
    describe("#Logging", function() {
        it("should throw an error and exit", function() {
            var logger = Logger.instance;
            
            var thrown = false;
            
            try {
                logger.throw("TEST");
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceof(Error);
                expect(error.message).to.be.equal("TEST");
                
                thrown = true;
            } finally {
                expect(thrown).to.be.true;
            }
        });
        
        it("should throw an error without exiting", function() {
            var logger = Logger.instance;
            logger.options.throwError = false;
            
            var thrown = false;
            
            try {
                logger.throw("TEST");
            } catch (error) {
                thrown = true;
            } finally {
                expect(thrown).to.be.false;
            }
        });
    });
});