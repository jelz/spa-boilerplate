var SEPARATOR = '___';
var KEY = 'access_token';
var DEFAULT_HEADER_NAME = 'X-Access-Token';

var store = require('./local-store.js');

var headerName = null;
var getHeaderName = function() {
    return headerName || DEFAULT_HEADER_NAME;
};

module.exports = {
    DEFAULT_HEADER_NAME: DEFAULT_HEADER_NAME,
    setHeaderName: function(name) {
        headerName = name;
    },
    isStored: function() {
        return store.has(KEY);
    },
    get: function() {
        return store.get(KEY);
    },
    remove: function() {
        store.remove(KEY);
    },
    readFromHash: function() {
        var parts = (window.location.hash || '#').split(SEPARATOR);
        var reminder;

        if (parts.length > 1) {
            store.set(KEY, parts.pop());
            reminder = parts.join('');
            window.location.hash = reminder.length < 2 ? '#/' : reminder;
        }
    },
    configureHeader: function($httpProvider) {
        if (store.has(KEY)) {
            $httpProvider.defaults.headers.common[getHeaderName()] = store.get(KEY);
        }
    },
    removeHeader: function($http) {
        delete $http.defaults.headers.common[getHeaderName()];
    }
};
