(function() {
    var MODE = window.APP_MODE;
    var CONFIG = require('../../config/config.json');
    var app = require('../app');

    app.constant('MODE', MODE);
    app.constant('CONFIG', CONFIG[MODE]);

    app.factory('LocalStore', function() {
        return require('./local-store.js');
    });

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
    });
}());
