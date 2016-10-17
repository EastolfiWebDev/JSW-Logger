var banner = '' +
'/**\n' +
' * JSW-Logger.js - Logger for JavaScript based on Winston Logger.\n' +
' * version <%= pkg.version %>\n' +
' * \n' +
' * made by Eduardo Astolfi <eastolfi91@gmail.com>\n' +
' * copyright 2016 Eduardo Astolfi <eastolfi91@gmail.com>\n' +
' * MIT Licensed\n' +
' */\n';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        watch: {
            dist: {
                files: ['src/**/*.js'],
                tasks: ['build_app'],
                options: {
                    spawn: false,
                }
            }
        },
        
        babel: {
            options: {
                sourceMaps: "inline",
                compact: false
            },
            dist: {
                files: {
                    "lib/JSW-Logger.js":             "src/JSW-Logger.js"
                }
            }
        },
    
        simplemocha: {
            all: {
                src: ['test/1_Base.js']
            }
        },
        
        mocha: {
            browser: {
                src: ['test/browser/index.html'],
            }
        },
        
        jsdoc : {
            dist : {
                src: ['src/JSW-Logger.js'],
                options: {
                    destination: 'docs',
                    config: 'jsdoc.conf.json'
                }
            }
        },
        
        jsdoc2md: {
            fullDoc: {
                src: ['src/JSW-Logger.js'],
                dest: 'api/documentation.md'
            },
            apiDoc: {
                files: [
                    { src: 'src/JSW-Logger.js', dest: 'api/JSW-Logger.md' }
                ]
            }
        },
        
        coveralls: {
            options: {
                force: false
            },
            
            dist: {
                src: ['test/coverage/coverage-dist.lcov'],
                options: { }
            }
        },
        
        browserify: {
            browser: {
                files: {
                    './dist/jsw-logger.js': './index_browser.js'
                },
                options: {
                    transform: [['babelify', {presets: ['es2015', 'react']}]],
                    alias: {
                        'jsw-logger': './index_browser.js'
                    }
                }
            },
            options: {
                banner: banner
            }
        },
        
        uglify: {
            dist: {
                files: {
                    'dist/jsw-logger.min.js': ['dist/jsw-logger.js']
                }
            },
            options: {
                banner: banner
            }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-mocha');
    
    // Building
    grunt.registerTask('watch_dist', ['watch:dist']);
    grunt.registerTask('build_app', ['babel:dist']);
    grunt.registerTask('bundle', ['browserify:browser', 'uglify:dist']);
    
    // Documentation
    grunt.registerTask('build_doc', ['jsdoc:dist']);
    grunt.registerTask('build_html', ['jsdoc2md:fullDoc', 'jsdoc2md:apiDoc']);
    grunt.registerTask('build_full_doc', ['build_doc', 'build_html']);
    
    // Testing
    grunt.registerTask('dev_test', ['simplemocha:dev']);
    grunt.registerTask('coveralls_dist', ['coveralls:dist']);
    grunt.registerTask('test', ['simplemocha:all', 'mocha:browser']);
    
    grunt.registerTask('full_build', ['build_app', 'build_doc', 'test']);
    
    grunt.registerTask('default', ['full_build']);
};