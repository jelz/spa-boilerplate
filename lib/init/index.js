var MODE = window.APP_MODE;
var CONFIG = require('../../config/config.json')[MODE];

var store = require('./local-store.js');
var token = require('./access-token.js');
var app = require('../app');

var fetchUser = function() {
    var opts = { headers: {} };

    opts.headers[CONFIG.tokenHeaderName || token.DEFAULT_HEADER_NAME] = token.get();

    return angular.injector(['ng']).get('$http').get(CONFIG.apiUrl + '/user/me.json', opts);
};

var storeUser = function(res) {
    app.constant('INITIAL_USER', res && res.data ? res.data : null);
};

var storeEmptyUser = function() {
    app.constant('INITIAL_USER', null);
};

var bootApp = function() {
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['app']);
    });
};

token.setHeaderName(CONFIG.tokenHeaderName);
token.readFromHash();
app.constant('MODE', MODE);
app.constant('CONFIG', CONFIG);
app.config(token.configureHeader);
app.factory('LocalStore', function() { return store; });
app.factory('AccessToken', function() { return token; });

if (token.isStored()) {
    fetchUser().then(storeUser, storeEmptyUser).finally(bootApp);
} else {
    storeEmptyUser();
    bootApp();
}
