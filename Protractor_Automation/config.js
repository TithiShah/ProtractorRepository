var HtmlReporter = require('protractor-beautiful-reporter');
var log4js = require('log4js');
var logger = log4js.getLogger();

exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'internet explorer',
 	'platform': 'ANY',
        'version': '11',
        'loggingPrefs': {
            'driver': 'WARNING',
            'server': 'WARNING',
            'browser': 'INFO'
        }
    },
	
	webdriverVersions: {
        'seleniumServerJar': './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.12.0.jar'
    },
	
    framework: 'jasmine',

    specs: ['./specs/Bankspec.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    plugins: [{
        package: 'protractor-console',
        logLevels: ['severe','warning','info']
    }],

    appenders: [
        {
            "type": "file",
            "filename": "./logs/ExecutionLog.log",
            "maxLogSize": 20480,
            "backups": 0,
            "category": "relative-logger"
        }
    ],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 2500000
    },

    onPrepare: function() {
        browser.logger = log4js.getLogger('protractorLog4js');
        // Add a screenshot reporter and store TestResult to `/tmp/TestResult`:
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './TestResult',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            preserveDirectory: false,
            takeScreenShotsForSkippedSpecs: true,
            takeScreenShotsOnlyForFailedSpecs: true,
            docTitle: 'Test Result'
        }).getJasmine2Reporter());
    },

    beforeLaunch:function(){
        log4js.configure({
            appenders: {
                file: {type: 'file', filename: './logs/Executionlog.log', maxLogSize: 20480, backups: 0},
                console: {type: 'console'}
            },
            categories: {default: {appenders: ['file', 'console'], level: 'debug'}}
        });
    },

};