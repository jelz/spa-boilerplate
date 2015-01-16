var path = require('path');
var base = function(p) { return path.join(__dirname, p); };
var now = (new Date()).getTime();

var readOptionalFile = function(g, path) {
    try { return g.file.readJSON(path); } catch(e) {}
    return {};
};

module.exports = function(g) {
    g.initConfig({
        pkg: g.file.readJSON('package.json'),
        aws: readOptionalFile(g, 'config/aws.json'),

        clean: {
            vendor: {
                src: [
                    'public/build/vendor.js',
                    'public/build/vendor.min.js'
                ]
            },
            app: {
                src: [
                    'public/build/app.js',
                    'public/build/app.min.js',
                    'public/build/style.css',
                    'public/build/style.min.css'
                ]
            },
            bower: {
                src: ['bower_components']
            }
        },

        concat: {
            options: { separator: ';' },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: 'public/build/vendor.js'
            }
        },

        uglify: {
            vendor: {
                files: {
                    'public/build/vendor.min.js': ['public/build/vendor.js']
                }
            },
            app: {
                options: { mangle: false },
                files: {
                    'public/build/app.min.js': ['public/build/app.js']
                }
            }
        },

        cssmin: {
            app: {
                files: {
                    'public/build/style.min.css': ['public/build/style.css']
                }
            }
        },

        jshint: {
            app: {
                options: { jshintrc: true },
                src: [
                    'Gruntfile.js',
                    'config/config.js',
                    'lib/**/*.js'
                ]
            }
        },

        replace: {
            dev: {
                src: ['fronts/*.html'],
                dest: 'public/',
                replacements: [
                    { from: '{{MIN}}', to: '' },
                    { from: '{{MODE}}', to: 'dev' },
                    { from: '{{NOW}}', to: now },
                    { from: '{{RELOAD}}', to: '<script src="//localhost:35729/livereload.js"></script>' }
                ]
            },
            prod: {
                src: ['fronts/*.html'],
                dest: 'public/',
                replacements: [
                    { from: '{{MIN}}', to: '.min' },
                    { from: '{{MODE}}', to: 'prod' },
                    { from: '{{NOW}}', to: now },
                    { from: '{{RELOAD}}', to: '' }
                ]
            },
            map: {
                src: ['public/build/vendor.js'],
                overwrite: true,
                replacements: [
                    { from: /\/\/.*sourceMappingURL.*/i, to: '' }
                ]
            }
        },

        connect: {
            serve: {
                options: {
                    port: 8000,
                    middleware: function(connect) {
                        return [
                            connect.compress(),
                            connect.static(base('public')),
                            function(req, res) {
                                res.writeHead(404, { 'Content-Type': 'text/plain' });
                                res.end('404 Not found');
                            }
                        ];
                    }
                }
            }
        },

        watch: {
            rebuild: {
                tasks: ['build-dev'],
                options: { livereload: true },
                files: [
                    'fronts/*.html',
                    'config/config.json',
                    'lib/**/*.js',
                    'lib/**/*.html',
                    'lib/**/*.css'
                ]
            }
        },

        s3: {
            options: {
                accessKeyId: "<%= aws.accessKey %>",
                secretAccessKey: "<%= aws.secret %>",
                bucket: "<%= aws.bucket %>",
                region: "<%= aws.region %>",
                sslEnabled: true,
                gzip: true,
                overwrite: true,
                cache: true
            },
            publish: {
                cwd: 'public/',
                src: '**'
            }
        }
    });

    g.registerTask('bower', function() {
        var exec = require('shelljs').exec;
        var bowerExecutable = base('node_modules/bower/bin/bower');

        exec(bowerExecutable + ' install');
    });

    g.registerTask('browserify', function() {
        var fs = require('fs');
        var browserify = require('browserify');
        var html = require('html-browserify');
        var b = browserify();
        var done = this.async();

        b.add(base('lib/init/index.js'));
        b.transform(html);
        b.bundle(function(err, buf) {
            if (err) { throw err; }
            fs.writeFileSync(base('public/build/app.js'), buf);
            done();
        });
    });

    g.registerTask('style', function() {
        var find = require('findit');
        var buildify = require('buildify');
        var files = [];
        var finder = find(base('lib'));
        var done = this.async();

        finder.on('file', function(f) { if (/\.css$/i.test(f)) { files.push(f); } });
        finder.on('error', function(err) { throw err; });
        finder.on('end', function() {
            buildify('/').concat(files).save(base('public/build/style.css'));
            done();
        });
    });

    g.loadNpmTasks('grunt-contrib-clean');
    g.loadNpmTasks('grunt-contrib-concat');
    g.loadNpmTasks('grunt-contrib-jshint');
    g.loadNpmTasks('grunt-contrib-uglify');
    g.loadNpmTasks('grunt-contrib-cssmin');
    g.loadNpmTasks('grunt-contrib-connect');
    g.loadNpmTasks('grunt-contrib-watch');
    g.loadNpmTasks('grunt-text-replace');
    g.loadNpmTasks('grunt-newer');
    g.loadNpmTasks('grunt-aws');

    g.registerTask('lint', [
        'newer:jshint:app'
    ]);

    g.registerTask('vendor', [
        'clean:bower',
        'bower',
        'concat:vendor',
        'replace:map',
        'uglify:vendor'
    ]);

    g.registerTask('build', [
        'clean:app',
        'lint',
        'browserify',
        'style'
    ]);

    g.registerTask('build-dev', [
        'build',
        'replace:dev'
    ]);

    g.registerTask('build-prod', [
        'build',
        'replace:prod',
        'uglify:app',
        'cssmin:app'
    ]);

    g.registerTask('postinstall', [
        'vendor',
        'build-dev'
    ]);

    g.registerTask('publish', [
        'vendor',
        'build-prod',
        's3:publish'
    ]);

    g.registerTask('default', [
        'build-dev',
        'connect:serve',
        'watch:rebuild'
    ]);
};
